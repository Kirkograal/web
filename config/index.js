module.exports = {
	inProduction: process.env.NODE_ENV === 'production',
	inDevelopment: process.env.NODE_ENV === 'development',
	homePage: 'http://web-imkirko.7e14.starter-us-west-2.openshiftapps.com/',
	port: 8080,
	db: {
		url: `mongodb://${process.env[process.env.DATABASE_SERVICE_NAME + '_USER']}:${process.env[process.env.DATABASE_SERVICE_NAME + '_PASSWORD']}@${process.env[process.env.DATABASE_SERVICE_NAME + '_SERVICE_HOST']}:${process.env[process.env.DATABASE_SERVICE_NAME + '_PASSWORD']}/bot`
	},
	bot: {
		prefix: '>>',
		token: process.env.BOT_TOKEN
	},
	credentials: {
		google: {
			apiKey: process.env.GOOGLE_KEY
		}
	}
};