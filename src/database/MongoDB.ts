/// <reference path="../../typings/tsd.d.ts" />

//var seq = require('sequelize');
import * as mongoose from 'mongoose';
import {Config} from '../Config';

var db2: mongoose.Connection;
var Schema = mongoose.Schema;

export class BotDatabase {
		Bot: any;
		constructor() {
			if (typeof db2 !== 'undefined') return;
			db2 = mongoose.createConnection('mongodb://' + Config.dbHost + '/hitaBot', { server: { 
				socketOptions: { 
					keepAlive: 1
				}}});
			
			db2.once('open', function(callback) {
				console.log("Opened");
			});
			db2.once("error", function(callback) {
				console.log("Failed to open database");
			});
			this.SetupModels();
		}

		SetupModels() {
			var botSchema = new Schema({
				bot: String,
				authToken: String,
				owner: { type: String, default: "Hitakashi" },
				team: Array,
				public: { type: Boolean, default: true }
			});
			this.Bot = db2.model('Bots', botSchema);
		};

		GetBots(): Bot[] {
			var bot: Array<Bot> = [];
			this.Bot.find({}, { "_id": 0 }, function(err, res) {
				if (err) return;
				console.log('Log', res);
				bot = res.slice();
				console.log('Log2', bot);
			});
			return bot;
		}
	// DB Schemas
};

export interface Bot {
	bot: String,
	authToken: String,
	owner: String,
	team: Array<String>,
	public: Boolean
}