const { init } = require('./server');

process.on('unhandledRejection', err => {
	console.log(err);
	process.exit(1);
});

init().then(info => {
	console.log('Server running on %s', info.uri);
});
