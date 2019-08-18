const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;
const dbURI = (environment === 'production') ? process.env.MONGO_PROD_CONN_URL : process.env.MONGO_LOCAL_CONN_URL;
const dbName = process.env.DB_NAME;

mongoose.connect(dbURI, {
	useNewUrlParser: true,
	dbName,
	autoIndex: false,
});

// * Connection events
mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  	console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  	console.log('Mongoose disconnected');
});

/**
 * Capture app termination / Restart events
 * 
 * * To be called when process is restarted or terminated
 */
const gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log(`Mongoose disconnected through ${msg}`);
		callback();
	});
};
// * For nodemon restarts
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// * For app termination
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});

const User = require('./user');

module.exports = {
  	User
};