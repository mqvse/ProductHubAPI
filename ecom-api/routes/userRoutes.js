const Router = require('koa-router');
const auth = require('../middleware/auth');
const db = require('../models/db');

const router = new Router({ prefix: '/api/users' });

router.get('/me', auth, async (ctx) => {
  const [users] = await db.execute(
    `SELECT id, email, username, role FROM users WHERE id = ?`,
    [ctx.user.id]
  );
  ctx.body = users[0];
});

module.exports = router;
