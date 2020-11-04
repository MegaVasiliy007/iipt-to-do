const db = require('mysql2').createConnection({user: process.env.dblogin, password: process.env.dbpass, host: process.env.dbhost, database: "todo", charset: "utf8mb4"});
db.on('error', (e) => console.warn(e));
db.connect((err) => {if (err) return console.error(err); console.log('Connected to db. Pid:', db.threadId)});
db.query("SET SESSION wait_timeout = 604800");

module.exports = db.promise();