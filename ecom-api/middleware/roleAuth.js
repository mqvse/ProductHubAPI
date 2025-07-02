module.exports = (schema) => async (ctx, next) => {
    const validation = schema.validate(ctx.request.body);
    if (validation.error) {
      ctx.status = 400;
      ctx.body = { message: validation.error.details[0].message };
    } else {
      await next();
    }
  };
  