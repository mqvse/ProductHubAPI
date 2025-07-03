const Router = require('koa-router');
const productModel = require('../models/productModel');
const reviewModel = require('../models/reviewModel');

const router = new Router({ prefix: '/api/product-detail' });

router.get('/:id', async (ctx) => {
  try {
    // Get product by ID from your model
    const product = await productModel.getById(ctx.params.id);

    if (!product) {
      ctx.status = 404;
      ctx.body = { message: 'Product not found' };
      return;
    }

    // Get reviews from your review model
    const reviews = await reviewModel.getByProductId(ctx.params.id);

    // Respond with combined data
    ctx.body = {
      ...product,
      reviews,
      _links: {
        self: `/api/product-detail/${product.id}`,
        reviews: `/api/reviews?productId=${product.id}`
      }
    };

  } catch (err) {
    console.error('Failed to load product detail:', err);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});

module.exports = router;
