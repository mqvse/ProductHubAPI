const Router = require('koa-router');
const auth = require('../middleware/auth');
const reviewModel = require('../models/reviewModel');

const router = new Router({ prefix: '/api/products' });

// GET all reviews for a product
router.get('/:id/reviews', async (ctx) => {
  const reviews = await reviewModel.getByProductId(ctx.params.id);
  ctx.body = reviews;
});

// POST a new review for a product
router.post('/:id/reviews', auth, async (ctx) => {
  const productId = ctx.params.id;
  const { reviewer_name, rating, comment } = ctx.request.body;

  if (!rating || !comment) {
    ctx.status = 400;
    ctx.body = { message: "Rating and comment required." };
    return;
  }

  const review = {
    product_id: productId,
    reviewer_name: reviewer_name || "Anonymous",
    rating,
    comment
  };

  const id = await reviewModel.create(review);
  ctx.status = 201;
  ctx.body = { id, message: "Review added." };
});

module.exports = router;
