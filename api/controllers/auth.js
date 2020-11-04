const db = require('../service/db');

module.exports = {
	async login({ body: { login, password } }, res) {
		const status = await db.query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password]);
		res.json({ status: !!status[0][0] });
	},
	async registration({ body: { login, password } }, res) {
		try {
			await db.query('INSERT INTO users(login, password) VALUE (?, ?)', [login, password]);
			res.json({ status: true });
		} catch (e) {
			res.status(500).json({ status: false });
		}
	}
}