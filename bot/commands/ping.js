module.exports = {
	run: (message) => {
		message.channel.send('Pong!');
	},
	type: 'public',
	category: 'util',
	description: 'ping pong mother fucker!',
	params: []
};