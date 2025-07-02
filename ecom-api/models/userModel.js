const db = require('./db');

exports.findByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.createUser = async (user) => {
  const [result] = await db.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
    [user.email, user.password, user.username]);
  return result.insertId;
};
