
function addToQueue(bot, guildID, item) {
	if (bot.musicQueue.has(guildID)) {
		let queue = bot.musicQueue.get(guildID);
		queue.push(item);
	} else {
		bot.musicQueue.set(guildID, [item]);
	}
}

function nextInQueue(bot, guildID) {

}

module.exports.addToQueue = addToQueue;
module.exports.nextInQueue = nextInQueue;

module.exports = (bot) => {
	bot.musicQueue = new Map();
};