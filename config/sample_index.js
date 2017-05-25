module.exports = {
	inProduction: process.env.NODE_ENV === 'production',
	inDevelopment: process.env.NODE_ENV === 'development',
	homePage: '',
	port: 8080,
	db: {
		developmentURL: 'mongodb://localhost:27017/bot',
		productionURL: ''
	},
	bot: {
		prefix: '>>',
		token: ''
	},
	credentials: {
		google: {
			apiKey: ''
		}
	}
};