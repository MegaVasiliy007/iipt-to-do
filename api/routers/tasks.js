const { Router } = require('express')
	, router = Router()
	, tasksCtrl = require('../controllers/tasks')
;

router.route('/')
	.get(tasksCtrl.get)
	.post(tasksCtrl.create)

router.route('/:id')
	.put(tasksCtrl.update)
	.delete(tasksCtrl.delete)

module.exports = router;