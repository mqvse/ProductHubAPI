const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { message: 'No token provided' };
    return;
  }
  try {
    const token = authHeader.split(' ')[1];
    ctx.user = jwt.verify(token, process.env.JWT_SECRET);
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid token' };
  }
};
