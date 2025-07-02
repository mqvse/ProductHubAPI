const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const router = new Router({ prefix: '/api/auth' });

router.post('/register', async (ctx) => {
  const { email, password, username } = ctx.request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await userModel.createUser({ email, password: hashedPassword, username });
  ctx.body = { id: userId, email, username };
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await userModel.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid credentials' };
    return;
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  ctx.body = { token };
});

module.exports = router;
