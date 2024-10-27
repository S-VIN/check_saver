

-- Вставка данных в таблицу products с реальными брендами
INSERT INTO products (name, volume, brand, category) VALUES
('Milk', '1L', 'Alpro', 'Dairy'),
('Bread', '500g', 'Wonder', 'Bakery'),
('Apple', '1kg', 'Gala', 'Fruit'),
('Butter', '200g', 'Lurpak', 'Dairy'),
('Shampoo', '250ml', 'Head & Shoulders', 'Personal Care'),
('Juice', '1L', 'Tropicana', 'Beverage'),
('Soap', '100g', 'Dove', 'Personal Care'),
('Chocolate', '100g', 'Lindt', 'Snacks'),
('Eggs', '12 pcs', 'Happy Egg Co.', 'Dairy'),
('Cereal', '500g', 'Kelloggs', 'Breakfast');

-- Вставка данных в таблицу purchases
INSERT INTO purchases (product_id, date, price, quantity, tags) VALUES
(1, '2023-01-01', 100, 2, ARRAY['grocery', 'daily']),
(2, '2023-01-02', 50, 1, ARRAY['grocery', 'bakery']),
(3, '2023-01-03', 150, 3, ARRAY['fruit', 'fresh']),
(4, '2023-01-04', 200, 1, ARRAY['dairy', 'spread']),
(5, '2023-01-05', 300, 1, ARRAY['personal care', 'shampoo']),
(6, '2023-01-06', 120, 2, ARRAY['beverage', 'juice']),
(7, '2023-01-07', 40, 3, ARRAY['personal care', 'hygiene']),
(8, '2023-01-08', 80, 1, ARRAY['snacks', 'chocolate']),
(9, '2023-01-09', 60, 1, ARRAY['grocery', 'eggs']),
(10, '2023-01-10', 250, 1, ARRAY['breakfast', 'cereal']);

INSERT INTO checks (purchase_ids) VALUES
(ARRAY[1, 2]),
(ARRAY[2, 3]),
(ARRAY[1, 3, 4]),
(ARRAY[4, 5]),
(ARRAY[5, 6]),
(ARRAY[6, 7, 8]),
(ARRAY[7, 8, 9]),
(ARRAY[8, 9]),
(ARRAY[9, 10]),
(ARRAY[1, 10]);

INSERT INTO checks (purchase_ids) VALUES (ARRAY[1,2,3]) RETURNING id;