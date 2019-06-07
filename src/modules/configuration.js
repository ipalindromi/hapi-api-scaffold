const { DEFAULT_CONFIG_PATH } = require('../consts');

function makeDefaultConfig({ PORT, HOST }) {
	return {
		serverConfig: {
			port: PORT || 3000,
			host: HOST || 'localhost',
			routes: {
				cors: {
					origin: ['*'],
				},
			},
		},
		features: [],
		routingOptions: {},
	};
}

/**
 * Reads the config file, if there is one
 *
 * @param {object} env - An object representing the environmental args
 */
exports.readConfig = async function readConfig(
	configPath = DEFAULT_CONFIG_PATH,
	options = {},
) {
	try {
		conf = require(configPath);

		if (typeof conf === 'function') conf = await conf(options);
		if (typeof conf !== 'object') throw new Error('Non-object returned as config');
	} catch (e) {
		if (!e.code === 'MODULE_NOT_FOUND')
			console.warn('Error when loading config: ', e);
		else console.info('No config file found.');
		conf = {};
	}

	const config = Object.assign(makeDefaultConfig(options), conf);
	return config;
};
