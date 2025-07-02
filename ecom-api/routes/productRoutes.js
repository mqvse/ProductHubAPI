const Router = require('koa-router');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const productModel = require('../models/productModel');

const router = new Router({ prefix: '/api/products' });

// List all products
router.get('/', async (ctx) => {
  ctx.body = await productModel.getAll();
});

// Create new product (admin only)
router.post('/', auth, roleAuth('admin'), async (ctx) => {
  const { name, price, stock, category_id, image_url, description } = ctx.request.body;

  // Simple validation
  if (!name || !price || !stock || !category_id || !image_url || !description) {
    ctx.status = 400;
    ctx.body = { message: 'All fields are required' };
    return;
  }

  const id = await productModel.create({ name, price, stock, category_id, image_url, description });
  ctx.status = 201;
  ctx.body = { id, message: 'Product created successfully' };
});

module.exports = router;
