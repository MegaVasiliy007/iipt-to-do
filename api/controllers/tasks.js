const db = require('../service/db');

module.exports = {
	async get({ query: { login } }, res) {
		const [data] = await db.query('SELECT * FROM items LEFT JOIN tasks using (list_id) WHERE login = ?', [login]);
		const tasks = [];
		for (const task of data) {
			if (!tasks.find(el => el.id === task.list_id)) tasks.push({id: task.list_id, date: +task.date, items: []});
			tasks.find(el => el.id === task.list_id).items.push({id: task.item_id, name: task.name, done: task.done});
		}

		res.json({ status: 'OK', tasks });
	},

	async create({ body: { login, date, items = [] } }, res) {
		const [{ insertId: id }] = await db.query('INSERT INTO tasks(login, date) VALUE (?, ?)', [login, new Date(date)]);

		const tasks = [];
		for (const name of items) {
			const [{ insertId: it }] = await db.query('INSERT INTO items(list_id, name) VALUE (?, ?)', [id, name]);
			tasks.push({ id: it, name, done: 0 });
		}

		res.json({ status: 'OK', task: { id, date, items: tasks } });
	},

	async update({ params: { id }, body: { date, items } }, res) {
		await db.query('UPDATE tasks SET date = ? WHERE list_id = ?', [new Date(date), id]);

		const itemsDB = await db.query('SELECT item_id FROM items WHERE list_id = ?', id);

		for (const { item_id: i } of itemsDB[0]) {
			if (items.find(el => el.id === i)) continue;
			await db.query('DELETE FROM items WHERE item_id = ?', [i])
		}

		for (const item of items) {
			if (item.id)
				await db.query('UPDATE items SET name = ?, done = ? WHERE item_id = ? AND list_id = ?', [item.name, item.done, item.id, id]);
			else {
				const [{insertId: it}] = await db.query('INSERT INTO items(list_id, name) VALUE (?, ?)', [id, item.name]);
				item.id = it;
				item.done = 0;
			}
		}

		res.json({ status: 'OK', task: {id, date, items } });
	},

	async delete({ params: { id } }, res) {
		await db.query('DELETE FROM items WHERE list_id = ?', [id]);
		await db.query('DELETE FROM tasks WHERE list_id = ?', [id]);
		res.json({ status: 'OK'});
	}
}