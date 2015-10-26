/// <reference path="../../typings/tsd.d.ts" />

// Why a bot and channel listeners?
// While a bot is inside it's own channel, It only has to listen to a small subset of events. (Pretty much just chatMsg)
// Instead of wiring up every single event, we just need one, and it removes the need to check if botname==channel allow joins.

import * as socketio from 'socket.io-client';
import * as UserMsgs from '../interfaces/messages/UserMessages';

export function ChannelListeners(io) {
	io.on('chatMsg', function(data: UserMsgs.IChatMsg) {
		console.log(data);
	});
}