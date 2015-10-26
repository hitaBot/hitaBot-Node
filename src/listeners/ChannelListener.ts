/// <reference path="../../typings/tsd.d.ts" />

// Setup normal channel listeners
import * as socketio from 'socket.io-client';
import * as UserMsgs from '../interfaces/messages/UserMessages';

export function ChannelListeners(io) {
	io.on('chatMsg', function(data: UserMsgs.IChatMsg) {
		console.log(data);
	});
}