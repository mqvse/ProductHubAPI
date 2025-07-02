const db = require('./db');

exports.getByProductId = async (productId) => {
  const [reviews] = await db.execute(
    `SELECT id, product_id, reviewer_name, rating, comment FROM reviews WHERE product_id = ?`,
    [productId]
  );
  return reviews;
};

exports.create = async (review) => {
  const [result] = await db.execute(
    `INSERT INTO reviews (product_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?)`,
    [review.product_id, review.reviewer_name, review.rating, review.comment]
  );
  return result.insertId;
};
