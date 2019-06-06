('use strict');

const Hapi = require('@hapi/hapi');
const { FEATURES } = require('./consts');

/**
 * Initializes the web server.
 *
 * Options can be set at initialization time to control what features
 * are available to the server.
 *
 * Features:
 * ---------------
 * - View rendering and template setup
 * - API setup with sane versioning
 *
 * @param {bool} withViews - If true, will set up view rendering
 */
const init = async ({ features, serverConfig }) => {
	const enabledFeatures = features;

	const server = Hapi.server(serverConfig);

	// TODO: Set up function to include all routes and test
	const routes = { ...require('./routes') };

	server.route(routes.users.get);
	server.route(routes.users.post);

	// OPTIONAL FEATURES
	if (features && features.includes(FEATURES.FEATURES_WITH_VIEW) === true)
		console.info('View template system enabled by feature flag');
	await _registerViewLayer(server);

	return server;
};

// TODO: Test, if logic/config is added. Otherwise, testing is handled
// by checking whether we can or cannot render a template.
async function _registerViewLayer(server, options = false) {
	await server.register(require('@hapi/vision'));
	const defaultOptions = {
		engines: {
			html: require('handlebars'),
		},
		relativeTo: __dirname,
		path: 'templates',
		helpersPath: 'modules',
	};
	const view_options = options
		? Object.assign(defaultOptions, options)
		: defaultOptions;
	server.views(view_options);
}

exports.init = init;
