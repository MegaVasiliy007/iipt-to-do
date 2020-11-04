const express = require('express')
	, app = express()
;

app
	.use(require('cors')(require('./controllers/cors')))
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use('/auth', require('./routers/auth'))
	.use('/shop', require('./routers/shop'))
	.use('/meeting', require('./routers/meeting'))
	.use('/tasks', require('./routers/tasks'))

app.listen(process.env.PORT || 8080, () => console.log('Listen on:', process.env.PORT || 8080));