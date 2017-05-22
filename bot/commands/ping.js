module.exports = {
	run: (bot, db, msg) => {
		msg.channel.send('Pong!');
	},
	type: 'public',
	category: 'util',
	description: 'ping pong mother fucker!',
	params: []
};