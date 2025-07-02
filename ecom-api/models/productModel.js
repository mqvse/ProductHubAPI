const db = require('./db');

exports.getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM products');
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    price: row.price,
    stock: row.stock,
    category_id: row.category_id,
    image_url: row.image_url,
    description: row.description
  }));
};

exports.getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
  const row = rows[0];
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    stock: row.stock,
    category_id: row.category_id,
    image_url: row.image_url,
    description: row.description
  };
};

exports.create = async (product) => {
  const [result] = await db.execute(
    'INSERT INTO products (name, price, stock, category_id, image_url, description) VALUES (?, ?, ?, ?, ?, ?)',
    [product.name, product.price, product.stock, product.category_id, product.image_url, product.description]
  );
  return result.insertId;
};
