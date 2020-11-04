const { Router } = require('express')
	, router = Router()
	, authCtrl = require('../controllers/auth')
;

router.route('/login')
	.post(authCtrl.login)

router.route('/registration')
	.post(authCtrl.registration)

module.exports = router;