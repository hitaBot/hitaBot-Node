/// <reference path="../typings/tsd.d.ts" />

import * as socket from 'socket.io-client';
import {Utils} from './Utils';
import {EventEmitter} from 'events';
import {IBot} from './interfaces/Bots';
import {IChannel} from './interfaces/Channel';
import * as BM from './managers/BotManager';


export class Channel extends EventEmitter {
	channel: string;
	bot: IBot;
	io: SocketIOClient.Emitter;
	isBot: boolean;
	constructor(channel: IChannel, bot: boolean = false, ibot: IBot) {
		super();
		this.channel = channel.channel.toLowerCase();
		this.StartWebSocket();
		this.isBot = bot;
		this.bot = ibot;
	}

	getChannel() {
		return this.channel;
	};
	
	getBotName() {
		return this.bot.bot;
	}
	
	getBotAuth() {
		return this.bot.authToken;
	}

	StartWebSocket() {
		// Start WebSocket
		var serverList;
		var t = this;
		Utils.get({ url: 'https://api.hitbox.tv/chat/servers', gzip: true },
			function(data) {
				serverList = JSON.parse(data);
				t.io = socket.connect(serverList[0].server_ip.toString(), { 'force new connection': true, 'autoConnect': true });

				// Setup Channel Listeners
				t.SetupListeners();
			});
	};

	SetupListeners() {
		var t = this;
		this.io.on('connect', function() {
			console.log("Connected");
			this.emit('message', { method: 'joinChannel', params: { name: t.getBotName(), channel: t.getChannel(), token: t.getBotAuth() } });
		});

		this.io.on('message', function(data) {
			var json = JSON.parse(data);
			if (json.params.buffer) return;
			
			switch (json.method) {
				case 'chatMsg':
					console.log('>> chatMsg', json);
					t.emit('chatMsg', json);
					break;
				case 'loginMsg':
					t.emit('loginMsg', json);
					break;
			}
		});
	}
}