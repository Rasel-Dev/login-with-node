const { verify } = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
	checkUserToken: (req, res, next) => {
		let token = req.get('authorization');
		if (token) {
			token = token.slice(7);
			verify(token, process.env.SECRET_KEY, (err, decoded) => {
				if (err) {
					return res.json({
						message: 'Invalid token!',
					});
				} else {
					next();
				}
			});
		} else {
			return res.json({
				message: 'Access Denied! Unauthorized user.',
			});
		}
	},
};
