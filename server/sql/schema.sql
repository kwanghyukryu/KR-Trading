CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_product_name (name)
);

INSERT INTO products (name, category, quantity)
VALUES
  ('Napa cabbage', 'Brassica Vegetables', 120),
  ('Green cabbage', 'Brassica Vegetables', 95),
  ('Orange yams', 'Root Vegetables', 80),
  ('White yams', 'Root Vegetables', 75)
ON DUPLICATE KEY UPDATE
  category = VALUES(category),
  quantity = VALUES(quantity);
