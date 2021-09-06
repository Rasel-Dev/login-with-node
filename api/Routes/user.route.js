const { signUp, signIn, dashboard } = require('../Controllers/user.controller');
const { checkUserToken } = require('../Middleware/user.middleware');

const router = require('express').Router();

router.get('/', checkUserToken, dashboard);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
