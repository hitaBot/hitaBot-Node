/// <reference path="../typings/tsd.d.ts" />
import * as fs from 'fs';
var configFile = "config.json";

export var Config = {
	dbHost: "",
	dbPass: "",
	dbUser: ""
}

export function LoadSettings(): Promise<String> {
	var promise = new Promise(function(resolve, reject) {
		fs.readFile(configFile, function(err, data) {
			if (err) {
				reject(Error("Failed"));
			} else {
				var json = JSON.parse(data.toString());
				Config.dbHost = json.dbHost;
				Config.dbPass = json.dbPass;
				Config.dbUser = json.dbUser;
				resolve("Success");
			}
		});
	});
	return promise;
}