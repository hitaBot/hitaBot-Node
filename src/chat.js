var socket = require('socket.io-client');
var utils = require('./utils');
var cred = require('./credential');

var channels = [];
var c

function HitboxChat(opts) {
	if (!utils.isa(this, HitboxChat)) return new HitboxChat(opts);
	opts = opts || {};

	if (opts.name && opts.token) {
		this.cred = new cred.AuthToken(opts.name, opts.token);
	} else if (opts.name && opts.pass) {
		this.cred = new cred.AuthPass(opts.name, opts.pass);
	}

	HitboxChat.prototype = {
		open: function () {
			var t = this;
			utils.getHttp("https://api.hitbox.tv/chat/servers", function (body) {
				var servers = JSON.parse(body);

				var io = socket.connect(servers[0].server_ip);
				io.on('connect', t.onconnect.bind(t, io));
			});
		},
		onconnect: function (io) {
			this.connected = true;

			io.on('message', function(data) {
				console.log(data);
			})
		}
	}
}