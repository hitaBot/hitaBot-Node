/// <reference path="../typings/tsd.d.ts" />

import * as socket from 'socket.io-client';
import {Utils} from './Utils';
import {EventEmitter} from 'events';
import {Bot} from './interfaces/Bots';


export class Channel extends EventEmitter {
	channel: string;
	bot: Bot;
	io: SocketIOClient.Emitter;
	constructor(channelName: string, bot: Bot) {
		super();
		this.channel = channelName.toLowerCase();
		this.bot = bot;
		this.StartWebSocket();
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
		Utils.get({ url: 'https://api.hitbox.tv/chat/servers' },
			function(data) {
				serverList = JSON.parse(data);
				t.io = socket.connect(serverList[0].server_ip.toString(), { 'forceNew': true, 'autoConnect': true });
				console.log("Done getting servers");

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
			
			switch (json.method) {
				case 'chatMsg':
					//console.log('>> chatMsg', json);
					t.emit('chatMsg', json);
					break;
				case 'loginMsg':
					t.emit('chatMsg', json);
					break;
			}
		});
	}
}