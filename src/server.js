'use strict';

const Hapi = require('@hapi/hapi');

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
const init = async (withViews = false) => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost',
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	});

	// TODO: Set up function to include all routes and test
	const routes = { ...require('./routes') };

	server.route(routes.users.get);
	server.route(routes.users.post);

	// OPTIONAL FEATURES
	if (withViews === true) _registerViewLayer(server, withViews);

	await server.start();
	return server.info;
};

// TODO: Test, if logic/config is added. Otherwise, testing is handled
// by checking whether we can or cannot render a template.
async function _registerViewLayer(server, options) {
	await server.register(require('@hapi/vision'));
	const defaultOptions = {
		engines: {
			html: require('handlebars'),
		},
		relativeTo: __dirname,
		path: 'templates',
		helpersPath: 'modules',
	};
	const options = options ? Object.assign(defaultOptions, options) : defaultOptions;
	server.views(options);
}

exports.init = init;
