// const { getUsers } = require ('../modules/users.js')

const get = {
	method: 'GET',
	path: '/users',
	handler: function(request, h) {
		return 'Hello World!';
	},
};

const post = {
	method: 'POST',
	path: '/users',
	handler: function() {
		return { test: 'A post' };
	},
};

module.exports = {
	get,
	post,
};
