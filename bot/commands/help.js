module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		require('../gethelp')(bot, db, guildDoc, msg, cmdParams);
	},
	type: null,
	category: 'Bot',
	description: 'List of available commands',
	params: [
		{
			name: 'command',
			optional: true,
			description: 'Get details of a specific command.',
			default: null
		}
	]
};