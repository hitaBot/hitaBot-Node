/// <reference path="../../typings/tsd.d.ts" />

var bots = new Map();
var jsonfile = require('jsonfile');
import * as BotDB from '../database/BotDatabase';
import * as CM from './ChatManager';
import {IBot} from '../interfaces/Bots';
import {IChannel} from '../interfaces/Channel';

var db = BotDB;

export function LoadBots() {
	db.GetBots().then(function(result: IBot[]) {
		// This checks the Bot collection and adds them to the channels.
		result.forEach(element => {
			console.log('LoadBot', element);
			AddBot(element);
		});
		console.log('ConnectBot');
		CreateBotChannel();
	}).then(function() {
		// Kick off joins
		CM.LoadChannels();
	});
}

function AddBot(obj: IBot) {
	if (!bots.has(obj.bot)) {
		bots.set(obj.bot, obj);
	}
}


export function GetBot(name: string): IBot {
	return bots.get(name);
}

function CreateBotChannel() {
	bots.forEach(element => {
		BotDB.CreateChannel(element.bot, element._id, element.bot);
	});
}

function RemoveBot() {
	
}