const db = require('../service/db');

module.exports = {
	async get({ query: { login } }, res) {
		const [data] = await db.query('SELECT * FROM items LEFT JOIN shop using (list_id) WHERE login = ?', [login]);
		const shops = [];
		for (const shop of data) {
			if (!shops.find(el => el.id === shop.list_id)) shops.push({id: shop.list_id, date: +shop.date, items: []});
			shops.find(el => el.id === shop.list_id).items.push({id: shop.item_id, name: shop.name, done: shop.done});
		}

		res.json({ status: 'OK', shops });
	},

	async create({ body: { login, date, items = [] } }, res) {
		const [{ insertId: id }] = await db.query('INSERT INTO shop(login, date) VALUE (?, ?)', [login, new Date(date)]);

		const shops = [];
		for (const name of items) {
			const [{ insertId: it }] = await db.query('INSERT INTO items(list_id, name) VALUE (?, ?)', [id, name]);
			shops.push({ id: it, name, done: 0 });
		}

		res.json({ status: 'OK', shop: { id, date, items: shops } });
	},

	async update({ params: { id }, body: { date, items } }, res) {
		await db.query('UPDATE shop SET date = ? WHERE list_id = ?', [new Date(date), id]);

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

		res.json({ status: 'OK', shop: {id, date, items } });
	},

	async delete({ params: { id } }, res) {
		await db.query('DELETE FROM items WHERE list_id = ?', [id]);
		await db.query('DELETE FROM shop WHERE list_id = ?', [id]);
		res.json({ status: 'OK'});
	}
}