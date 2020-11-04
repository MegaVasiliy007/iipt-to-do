const { Router } = require('express')
	, router = Router()
	, meetingCtrl = require('../controllers/meeting')
;

router.route('/')
	.get(meetingCtrl.get)
	.post(meetingCtrl.create)

router.route('/:id')
	.put(meetingCtrl.update)
	.delete(meetingCtrl.delete)

module.exports = router;