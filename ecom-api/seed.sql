USE ecommerce;

INSERT INTO users (email, password, username, role) VALUES
('alice@example.com', '$2b$10$i2445JZJSXgz.hOXRtxR5uC5XuPQ2rm3GOR./kvEsu56FttanHMY.', 'alice', 'user'),
('bob@example.com', '$2b$10$i2445JZJSXgz.hOXRtxR5uC5XuPQ2rm3GOR./kvEsu56FttanHMY.', 'bob', 'admin');

INSERT INTO products (name, category, price) VALUES
('Vintage Shirt', 'Clothing', 39.99),
('Wireless Mouse', 'Electronics', 24.50),
('Ceramic Mug', 'Home', 12.75);

INSERT INTO reviews (product_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Love it!'),
(2, 2, 4, 'Decent mouse for the price.'),
(3, 1, 5, 'Looks great on my desk.');
