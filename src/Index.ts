/// <reference path="../typings/tsd.d.ts" />

//import {ChatManager} from './ChatManager';
import * as config from './Config'

// config.LoadSettings return a promise
var configPromise = config.LoadSettings();
configPromise.then(function(result) {
	// Config Loaded. Start Bots.
	var BM = require('./managers/BotManager');
	BM.LoadBots();
}, function(err) {
	// Failed.
	throw 'Config failed to load.'
});