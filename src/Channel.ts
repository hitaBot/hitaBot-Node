/// <reference path="../typings/tsd.d.ts" />

import * as socket from 'socket.io-client';
import {Utils} from './Utils';
import {EventEmitter} from 'events';
import {IBot} from './interfaces/Bots';
import {IChannel} from './interfaces/Channel';
import * as BM from './managers/BotManager';
import * as ChnLst from './listeners/ChannelListener';
import * as BotLst from './listeners/BotListener';
import * as UserMsgs from './interfaces/messages/UserMessages';


export class Channel extends EventEmitter {
	channel: string;
	bot: IBot;
	io: SocketIOClient.Socket;
	isBot: boolean;
	constructor(channel: IChannel, bot: boolean = false, ibot: IBot) {
		super();
		this.channel = channel.channel.toLowerCase();
		this.Open();
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

	Open() {
		// Start WebSocket
		var serverList;
		var t = this;
		Utils.get({ url: 'https://api.hitbox.tv/chat/servers', gzip: true },
			function(data) {
				serverList = JSON.parse(data);
				t.io = socket.connect(serverList[0].server_ip.toString(), { 'force new connection': true, 'autoConnect': true });

				// Setup Channel Listeners
				if (t.isBot) {
					// Setup Bot Listeners
					BotLst.ChannelListeners(t);
				} else {
					// Setup channels listeners
					ChnLst.ChannelListeners(t);
				}
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
					var msg = chatMsg(json);
					t.emit('chatMsg', msg);
					break;
				case 'loginMsg':
					t.emit('loginMsg', json);
					break;
			}
		});
	}
	
	Close() {
		// Disconnect first to send out that event.
		this.io.disconnect();
		this.removeAllListeners();
		this.io.removeAllListeners();
	}
}

export function chatMsg(json): UserMsgs.IChatMsg {
	var params = json.params;
	console.log(json);
	if (params.buffersent === undefined) {
		params.buffersent = false;
	}
	if (params.buffer === undefined) {
		params.buffer = false;
	}
	if (params.image === undefined) {
		params.image = "";
	}
	var chtMsg: UserMsgs.IChatMsg = {
		channel: String = params.channel,
		name: params.name,
		nameColor: params.nameColor,
		text: params.text,
		time: params.time,
		role: params.role,
		isFollower: params.isFollower,
		isSubscriber: params.isSubscriber,
		isOwner: params.isOwner,
		isStaff: params.isStaff,
		isCommunity: params.isCommunity,
		media: params.media,
		image: params.image,
		buffer: params.buffer,
		buffersent: params.buffersent
	};
	return chtMsg;
}