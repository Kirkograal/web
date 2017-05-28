// For openshift
function getDBURL() {
	if (process.env.NODE_ENV !== 'production') {
		return `mongodb://localhost:27017/${process.env.DEV_DATABASE}`;
	} else {
		let mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
		    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
		    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
		    mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
		    mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
			mongoUser = process.env[mongoServiceName + '_USER'],
			mongoURL = '';

		if (mongoHost && mongoPort && mongoDatabase) {
			if (mongoUser && mongoPassword)
				mongoURL += mongoUser + ':' + mongoPassword + '@';

			mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
			return mongoURL;
		}
	}
}

module.exports = {
	inProduction: process.env.NODE_ENV === 'production',
	inDevelopment: process.env.NODE_ENV === 'development',
	homePage: 'http://web-imkirko.7e14.starter-us-west-2.openshiftapps.com/',
	port: 8080,
	db: {
		url: getDBURL()
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