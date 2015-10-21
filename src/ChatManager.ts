/// <reference path="../typings/tsd.d.ts" />

var channels = new Map();
import {Channel} from './Channel';
import {Bot} from './interfaces/Bots';
import * as HitaBotChat from './Hitabot-Chat';

export class ChatManager {

	static AddChannel(channel: string, bot: Bot) {
		if (channels.has(channel)) return;
		var channelObj = new Channel(channel, bot);
		// Think of the following as a middleware. The Channel class handles connection and emitting while hitabot-chat uses the emits for our custom implementation.
		// EX: Commands, Timers, Etc.
		HitaBotChat.HitaBot(channelObj);
		
		channels.set(channel, channelObj);
	}

	static RemoveChannel(channel: string) {
		var chn: Channel = channels.get(channel);
		chn.removeAllListeners();
		channels.delete(channel);
	}

	static GetChannel(channel: string) {
		return channels.get(channel);
	}

	static HasChannel(channel: string) {
		return channels.has(channel);
	}
}