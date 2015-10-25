import * as Channel from './Channel';

export function HitaBot(channel: Channel.Channel) {

	channel.on('chatMsg', function(data) {
		console.log('chat', JSON.stringify(data));
	});
	
	channel.on('loginMsg', function(data) {
		console.log('login', JSON.stringify(data));
	});
}