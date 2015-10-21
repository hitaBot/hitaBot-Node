/// <reference path="../typings/tsd.d.ts" />

import * as request from 'request';

export class Utils {
	constructor() {

	}
	static get(opts, callback) {
		request.get(opts, function(_, res, body) {
			if (!_ && res.statusCode == 200) {
				callback(body.toString());
			} else {
				callback("failed");
			}
		});
	}
}
function test() {

}