/// <reference path="../../typings/tsd.d.ts" />

var channels = new Map();
import {Channel} from '../Channel';
import {IBot} from '../interfaces/Bots';
import {IChannel} from '../interfaces/Channel';
import * as BotDB from '../database/BotDatabase';
import * as BM from './BotManager';


export function AddChannel(channel: IChannel, bot: IBot) {
	if (channels.has(channel.channel)) return;
	var channelObj = new Channel(channel, false, bot);
	// Think of the following as a middleware. The Channel class handles connection and emitting while listeners uses the emits for our custom implementation.
	// EX: Commands, Timers, Etc.

	channels.set(channel.channel, channelObj);
}

export function RemoveChannel(channel: string) {
	var chn: Channel = channels.get(channel);
	chn.removeAllListeners();
	channels.delete(channel);
}

export function GetChannel(channel: string) {
	return channels.get(channel);
}

export function HasChannel(channel: string) {
	return channels.has(channel);
}

export function LoadChannels() {
	BotDB.GetChannels().then(function(result) {
		var res: IChannel[] = result;
		res.forEach(element => {
			console.log(BM.GetBot(element.bot));
			AddChannel(element, BM.GetBot(element.bot));
		});
	}, function(err) {
		console.log('Failed LoadChannels In ChatManager')
	})
}
