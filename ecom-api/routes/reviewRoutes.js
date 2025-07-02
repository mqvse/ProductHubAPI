const Router = require('koa-router');
const auth = require('../middleware/auth');
const reviewModel = require('../models/reviewModel');

const router = new Router({ prefix: '/api/products' });

router.post('/:id/reviews', auth, async (ctx) => {
  const { reviewer_name, rating, comment } = ctx.request.body;

  if (!reviewer_name || !rating || !comment) {
    ctx.status = 400;
    ctx.body = { message: "All fields are required." };
    return;
  }

  const review = {
    product_id: ctx.params.id,
    reviewer_name,
    rating,
    comment
  };

  const id = await reviewModel.create(review);
  ctx.status = 201;
  ctx.body = { id, message: "Review added." };
});

module.exports = router;
