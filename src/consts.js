const path = require('path');
exports.DEFAULT_CONFIG = {};
exports.DEFAULT_CONFIG_PATH = path.join(__dirname, './.config.js');

exports.FEATURES = {
	// If set, the server will configure and use template rendering.
	FEATURES_WITH_VIEW: 1,
};
