const Router = require('koa-router');
const productModel = require('../models/productModel');
const reviewModel = require('../models/reviewModel');

const router = new Router({ prefix: '/api/product-detail' });

router.get('/:id', async (ctx) => {
  const product = await productModel.getById(ctx.params.id);
  if (!product) {
    ctx.status = 404;
    ctx.body = { message: 'Product not found' };
    return;
  }
  const reviews = await reviewModel.getByProductId(ctx.params.id);
  ctx.body = {
    ...product,
    reviews,
    _links: {
      self: `/api/product-detail/${product.id}`,
      reviews: `/api/reviews?productId=${product.id}`
    }
  };
});

module.exports = router;
