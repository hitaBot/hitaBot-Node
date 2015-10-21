/// <reference path="../typings/tsd.d.ts" />

import {connect} from 'socket.io-client';
import {Utils} from './Utils';
import {ChatManager} from './ChatManager';
import {EventEmitter} from 'events';


export class Channel extends EventEmitter {
	name: string;
	io: SocketIOClient.Emitter;
	SetListeners: any;
	constructor(channelName: string) {
		super();
		this.name = channelName;
	}

	getName() {
		return this.name;
	}

	StartWebSocket() {
		// Start WebSocket
		var serverList;
		var t = this;
		Utils.get({ url: 'https://api.hitbox.tv/chat/servers' },
			function(data) {
				serverList = JSON.parse(data);
				t.io = connect(serverList[0].server_ip.toString(), { 'forceNew': true, 'autoConnect': true });
				console.log("Done getting servers");

				t.SetupListeners();
			});
	}

	SetupListeners() {
		var t = this;
		this.io.on('connect', function() {
			console.log("Connected");
			this.emit('message', { method: 'joinChannel', params: { name: t.getName(), channel: 'hitakashi', token: '' } });
		});

		this.io.on('message', function(data) {
			console.log("Test: " + data);
		});
	}
}