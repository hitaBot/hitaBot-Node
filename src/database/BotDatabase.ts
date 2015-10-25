/// <reference path="../../typings/tsd.d.ts" />

//var seq = require('sequelize');
import * as mongoose from 'mongoose';
import {Config} from '../Config';
import {IBot} from '../interfaces/Bots';
import {IChannel} from '../interfaces/Channel';
import * as CM from '../managers/ChatManager';

var db2: mongoose.Connection;
var Schema = mongoose.Schema;

var Bot: mongoose.Model<mongoose.Document>;
var Channel: mongoose.Model<mongoose.Document>;

if (typeof db2 === 'undefined') {
	db2 = mongoose.createConnection('mongodb://' + Config.dbHost + '/hitaBot', { server: { 
		socketOptions: {
			keepAlive: 1
		}
	}
	});
			
	db2.once('open', function(callback) {
		console.log("Opened");
	});
	db2.once("error", function(callback) {
		console.log("Failed to open database");
	});
	SetupModels();
}

export function SetupModels() {
	var botSchema = new Schema({
		_id: Schema.Types.Mixed,
		bot: String,
		authToken: String,
		owner: { type: String, default: "Hitakashi" },
		team: Array,
		public: { type: Boolean, default: true }
	});
	
	var channelSchema = new Schema({
		channel: {type: String, unique: true},
		enabled: {type: Boolean, default: true},
		premium: {type: Boolean, default: false},
		bot: String,
		botRef: {type: Schema.Types.ObjectId, ref: 'Bot'}
	});
	Bot = db2.model('Bot', botSchema);
	Channel = db2.model("Channels", channelSchema);
	
};

export function GetBots(): Promise<any> {
	var promise = new Promise(function(resolve, reject) {
		Bot.find({}, function(err, res) {
			if (err) {
				reject(Error("Query Failed"));
			} else {
				resolve(res);
			}
		});
	});
	return promise;
};

export function GetChannels(): Promise<any> {
	var promise = new Promise(function(resolve, reject) {
		Channel.find({}).populate("botRef").exec(function(err, res: any) {
			if (err) {
				reject(Error("Query Failed"));
			} else {
				console.log('botRef', res[0].botRef.authToken);
				resolve(res);
			}
		});
	});
	return promise;
}

export function CreateChannel(channelName: string, botRef: mongoose.Types.ObjectId, bot: String) : Promise<any> {
	var promise = new Promise(function(resolve, reject) {
		Channel.update({channel: channelName, botRef: botRef, bot: bot}, {upsert: true},function(err, res) {
			if (err) {
				reject(Error("Query Failed"));
			} else {
				console.log('CreateChannel', res);
				resolve(res);
			}
		});
	});
	return promise;
}