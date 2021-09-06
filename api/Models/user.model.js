const pool = require('../../config/db');

module.exports = {
	register: (data, callback) => {
		pool.query(
			`INSERT INTO users (username, email, password) VALUES (?,?,?)`,
			[data.username, data.email, data.password],
			(err, result) => {
				if (err) {
					return callback(err);
				}
				return callback(null, result);
			},
		);
	},

	login: (data, callback) => {
		pool.query(
			`SELECT id, password FROM users WHERE username = ?`,
			data.username,
			(err, result) => {
				if (err) {
					return callback(err);
				}
				if (!result[0]) {
					return callback('Login credentials are wrong!');
				}
				return callback(null, result[0]);
			},
		);
	},

	user: (callback) => {
		pool.query(`SELECT id, username, email FROM users`, (err, result) => {
			if (err) {
				return callback(err);
			}
			return callback(null, result);
		});
	},
};
