module.exports = {
	inProduction: process.env.NODE_ENV === 'production',
	inDevelopment: process.env.NODE_ENV === 'development',
	homePage: 'http://web-imkirko.7e14.starter-us-west-2.openshiftapps.com/',
	port: 8080,
	db: {
		developmentURL: `mongodb://localhost:27017/${process.env.MONGODB_DATABASE}`,
		productionURL: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@0.0.0.0:27017/${process.env.MONGODB_DATABASE}`
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