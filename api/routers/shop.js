const { Router } = require('express')
	, router = Router()
	, shopCtrl = require('../controllers/shop')
;

router.route('/')
	.get(shopCtrl.get)
	.post(shopCtrl.create)

router.route('/:id')
	.put(shopCtrl.update)
	.delete(shopCtrl.delete)

module.exports = router;