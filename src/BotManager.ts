/// <reference path="../typings/tsd.d.ts" />

var Bots = new Map();
var jsonfile = require('jsonfile');
import * as BotDB from './database/MongoDB';

var file = 'config.json'

var bots = [];
export var db: BotDB.BotDatabase = new BotDB.BotDatabase();
export function LoadBots() {
	var bots = db.GetBots();
	bots.forEach(element => {
		AddBot(element)
	});
}

function LoadBotChannels() {

}

function AddBot(obj: BotDB.Bot) {
	if (!Exists(obj.bot, bots)) {
		bots.push(obj);
	}
}

function RemoveBot() {

}

function SaveBotJSON() {

}

function RemoveBotJSON() {

}

function Exists(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].bot === nameKey) {
            return myArray[i];
        }
    }
}
