const db = require('../service/db');

module.exports = {
	async get({query: {login}}, res) {
		const [meetings] = await db.query('SELECT * FROM meeting WHERE login = ?', [login]);
		res.json({status: 'OK', meetings});
	},

	async create({body: {login, date, name, address, comment}}, res) {
		const [{insertId: id}] = await db.query(
			'INSERT INTO meeting(login, name, address, comment, date) VALUE (?, ?, ?, ?, ?)',
			[login, name, address, comment, new Date(date)]
		);

		res.json({status: 'OK', meeting: {id, date, name, address, comment}});
	},

	async update({params: {id}, body: {date, name, address, comment}}, res) {
		await db.query(
			'UPDATE meeting SET date = ?, name = ?, address = ?, comment = ? WHERE meet_id = ?',
			[new Date(date), name, address, comment, id]
		);

		res.json({status: 'OK', meeting: {id, date, name, address, comment}});
	},

	async delete({ params: { id } }, res) {
		await db.query('DELETE FROM meeting WHERE meet_id = ?', [id]);
		res.json({status: 'OK'});
	}
}