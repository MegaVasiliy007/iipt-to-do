const db = require('../service/db');

module.exports = {
	async get({ query: { login } }, res) {
		const [data] = await db.query('SELECT * FROM items LEFT JOIN shop using (list_id) WHERE login = ?', [login]);
		const shops = [];
		for (const shop of data) {
			if (!shops.find(el => el.id === shop.list_id)) shops.push({id: shop.list_id, date: +shop.date, items: []});
			shops.find(el => el.id === shop.list_id).items.push({id: shop.item_id, name: shop.name});
		}

		res.json({ status: 'OK', shops });
	},

	async create({ body: { login, date, list = [] } }, res) {
		const [{ insertId: id }] = await db.query('INSERT INTO shop(login, date) VALUE (?, ?)', [login, new Date(date)]);

		const items = [];
		for (const name of list) {
			const [{ insertId: it }] = await db.query('INSERT INTO items(list_id, name) VALUE (?, ?)', [id, name]);
			items.push({ id: it, name });
		}

		res.json({ status: 'OK', shop: { id, date, items } });
	},

	async update({ params: { id }, body: { login, date, items } }, res) {
		await db.query('UPDATE shop SET date = ? WHERE list_id = ? AND login = ?', [new Date(date), id, login]);

		for (const item of items) {
			if (item.id)
				await db.query('UPDATE items SET name = ? WHERE item_id = ? AND list_id = ?', [item.name, item.id, id]);
			else {
				const [{insertId: it}] = await db.query('INSERT INTO items(list_id, name) VALUE (?, ?)', [id, item.name]);
				item.id = it;
			}
		}

		res.json({ status: 'OK', shop: {id, date, items } });
	},

	async delete({ params: { id }, body: { login } }, res) {
		await db.query('DELETE FROM items WHERE list_id = ?', [id]);
		await db.query('DELETE FROM shop WHERE list_id = ?', [id]);
		res.json({ status: 'OK'});
	}
}