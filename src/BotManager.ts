/// <reference path="../typings/tsd.d.ts" />

var Bots = new Map();
var jsonfile = require('jsonfile');
import * as BotDB from './database/MongoDB';
import * as CM from './ChatManager';
import {Bot} from './interfaces/Bots';

var file = 'config.json'

var bots: Array<Bot> = [];
export var db: BotDB.BotDatabase = new BotDB.BotDatabase();
export function LoadBots() {
	db.GetBots(function(bots: Bot[]) {
		bots.forEach(element => {
			console.log('LoadBot', element);
			AddBot(element);
		});
		console.log('ConnectBot');
		ConnectBot();
	});

}

function LoadBotChannels() {

}

function AddBot(obj: Bot) {
	if (!Exists(obj.bot, bots)) {
		bots.push(obj);
	}
}

function ConnectBot() {
	bots.forEach(element => {
		CM.ChatManager.AddChannel(element.bot, element);
	});
}

function RemoveBot() {

}

function Exists(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].bot === nameKey) {
            return myArray[i];
        }
    }
}
