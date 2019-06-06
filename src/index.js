const { init } = require('./server');
const { readConfig } = require('./modules/configuration');

process.on('unhandledRejection', handleUnhandledException);

// This process is async to allow for configuration that might
// require calling out to something, or some other long process.
getConfig(process.env).then(config => {
	startServer(config);
});

// --------------------------------------------------

/**
 * Handled a top-level exception that would otherwise be unhandled
 *
 * @param {object} e - The unhandled error
 */
function handleUnhandledException(err) {
	console.log(err);
	process.exit(1);
}

/**
 * This is the primary purpose of this file.
 * The configuration will be read, and then the configuration
 * will be used to retriev a HAPI server.
 *
 * The server will be immediately started.
 *
 * @param {object} config - An object that will be used for server setup
 */
async function startServer(config) {
	const server = await init(config);
	await server.start();

	console.log('Server running on %s', server.info.uri);
}

/**
 * Reads the config file, if there is one
 *
 * @param {object} env - An object representing the environmental args
 */
async function getConfig(env) {
	return await readConfig(env.CONFIG_PATH, env);
}
