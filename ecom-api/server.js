require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const productDetailRoutes = require('./routes/productDetailRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(logger);
app.use(authRoutes.routes());
app.use(productRoutes.routes());
app.use(productDetailRoutes.routes());
app.use(reviewRoutes.routes());
app.use(userRoutes.routes());
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
