/// <reference path="../typings/tsd.d.ts" />

var channels = new Map();
import {Channel} from './Channel';

export class ChatManager {

	static AddChannel(channel: string): number {
		if (channels.has(channel)) return 0;
		channels.set(channel, new Channel(channel));
		return 1;
	}

	static RemoveChannel(channel: string) {
		channels.delete(channel);
	}

	static GetChannel(channel: string) {
		return channels.get(channel);
	}

	static HasChannel(channel: string) {
		return channels.has(channel);
	}
}