module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		require('../gethelp')(bot, db, guildDoc, msg, cmdParams);
	},
	type: '',
	category: 'util',
	description: 'List of available commands',
	params: []
};