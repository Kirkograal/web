module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		require('../gethelp')(bot, db, guildDoc, msg, cmdParams);
	},
	type: null,
	category: 'Bot',
	description: 'List of available commands',
	params: [
		{
			name: 'query',
			optional: true,
			description: 'Command name, category, or type.',
			default: null
		}
	]
};