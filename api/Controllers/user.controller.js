const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { register, login, user } = require('../Models/user.model');
require('dotenv').config();

module.exports = {
	signUp: (req, res) => {
		let body = req.body;
		const solt = genSaltSync(10);
		body.password = hashSync(body.password, solt);
		register(body, (err, result) => {
			if (err) {
				return res.json({
					message: err,
				});
			}
			return res.json(result);
		});
	},

	signIn: (req, res) => {
		const body = req.body;
		login(body, (err, result) => {
			if (err) {
				return res.json({
					message: err,
				});
			}
			if (compareSync(body.password, result.password)) {
				result.password = null;
				const token = sign({ data: result }, process.env.SECRET_KEY);
				return res.json({
					data: result.id,
					token: `Bearer ${token}`,
					message: 'Authorized user.',
				});
			} else {
				return res.json({
					message: 'Login credentials are wrong!',
				});
			}
		});
	},

	dashboard: (req, res) => {
		user((err, result) => {
			if (err) {
				return res.json({
					message: err,
				});
			}
			return res.json({
				data: result,
			});
		});
	},
};
