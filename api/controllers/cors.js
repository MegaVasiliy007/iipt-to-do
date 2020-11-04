const origins = ['http://localhost:3000', 'https://todo.vlos.ru'];

module.exports = {
	origin(or, cb) {
		if (origins.indexOf(or) !== -1 || !or)
			cb(null, true);
		else
			cb(new Error('Not allowed by CORS'));
	}
}