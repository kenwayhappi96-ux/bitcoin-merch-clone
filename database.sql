-- =============================================
-- Base de données Bitcoin Merch - Administration
-- =============================================

CREATE DATABASE IF NOT EXISTS bitcoin_merch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bitcoin_merch;

-- =============================================
-- TABLE: admins
-- Gestion des comptes administrateurs
-- =============================================
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL COMMENT 'Hash bcrypt du mot de passe',
  role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
  avatar VARCHAR(255) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: categories
-- Collections de produits (Lucky Miners, Bitaxe, etc.)
-- =============================================
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(255) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_slug (slug),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: products
-- Produits du site
-- =============================================
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  long_description LONGTEXT COMMENT 'Description détaillée avec features, specs, etc.',
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2) DEFAULT NULL,
  stock INT DEFAULT 0,
  sku VARCHAR(100) UNIQUE DEFAULT NULL,
  weight DECIMAL(8,2) DEFAULT NULL COMMENT 'Poids en kg',
  dimensions VARCHAR(50) DEFAULT NULL COMMENT 'Ex: 10x5x3 cm',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  meta_title VARCHAR(255) DEFAULT NULL,
  meta_description VARCHAR(255) DEFAULT NULL,
  views_count INT DEFAULT 0,
  sales_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_slug (slug),
  INDEX idx_category (category_id),
  INDEX idx_active (is_active),
  INDEX idx_featured (is_featured),
  INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: product_images
-- Images multiples par produit
-- =============================================
CREATE TABLE product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255) DEFAULT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id),
  INDEX idx_primary (is_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: product_variants
-- Variantes de produits (couleurs, tailles, etc.)
-- =============================================
CREATE TABLE product_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL COMMENT 'Ex: Standard / Orange',
  sku VARCHAR(100) UNIQUE DEFAULT NULL,
  price_adjustment DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Ajustement de prix (+/-)',
  stock INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: product_features
-- Caractéristiques/avantages des produits
-- =============================================
CREATE TABLE product_features (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  feature_text TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: reviews
-- Avis clients sur les produits
-- =============================================
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) DEFAULT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(255) DEFAULT NULL,
  comment TEXT,
  is_verified BOOLEAN DEFAULT FALSE COMMENT 'Achat vérifié',
  is_approved BOOLEAN DEFAULT FALSE COMMENT 'Approuvé par admin',
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id),
  INDEX idx_approved (is_approved),
  INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: orders
-- Commandes clients
-- =============================================
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) DEFAULT NULL,
  
  -- Adresse de livraison
  shipping_address TEXT NOT NULL,
  shipping_city VARCHAR(100) NOT NULL,
  shipping_zip VARCHAR(20) NOT NULL,
  shipping_country VARCHAR(100) DEFAULT 'United States',
  
  -- Totaux
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0.00,
  tax DECIMAL(10,2) DEFAULT 0.00,
  discount DECIMAL(10,2) DEFAULT 0.00,
  total DECIMAL(10,2) NOT NULL,
  
  -- Statut et paiement
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50) DEFAULT NULL COMMENT 'credit, paypal, crypto, etc.',
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  
  -- Options
  shipping_protection BOOLEAN DEFAULT FALSE,
  order_instructions TEXT DEFAULT NULL,
  
  -- Tracking
  tracking_number VARCHAR(100) DEFAULT NULL,
  shipped_at DATETIME DEFAULT NULL,
  delivered_at DATETIME DEFAULT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_order_number (order_number),
  INDEX idx_email (customer_email),
  INDEX idx_status (status),
  INDEX idx_payment_status (payment_status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: order_items
-- Articles de chaque commande
-- =============================================
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT DEFAULT NULL COMMENT 'Peut être NULL si produit supprimé',
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100) DEFAULT NULL,
  variant_name VARCHAR(100) DEFAULT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
  INDEX idx_order (order_id),
  INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: newsletter_subscribers
-- Inscriptions à la newsletter
-- =============================================
CREATE TABLE newsletter_subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME DEFAULT NULL,
  
  INDEX idx_email (email),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: contact_messages
-- Messages de contact/support
-- =============================================
CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
  admin_notes TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: site_settings
-- Paramètres généraux du site
-- =============================================
CREATE TABLE site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
  description VARCHAR(255) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLE: carousel_slides
-- Slides du carousel homepage
-- =============================================
CREATE TABLE carousel_slides (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(255) NOT NULL,
  title VARCHAR(255) DEFAULT NULL,
  subtitle VARCHAR(255) DEFAULT NULL,
  link_url VARCHAR(255) DEFAULT NULL,
  button_text VARCHAR(50) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_active (is_active),
  INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- DONNÉES INITIALES
-- =============================================

-- Admin par défaut (mot de passe: Admin@123)
-- Hash bcrypt de "Admin@123"
INSERT INTO admins (name, email, password, role) VALUES 
('Super Admin', 'admin@bitcoinmerch.com', '$2b$10$Ff6VurIy98lE/dUyQGYLgeOnfxkiHWk2Mc/piudAwF7mrOl96kcrO', 'super_admin');

-- Catégories principales
INSERT INTO categories (name, slug, description, display_order) VALUES
('Lucky Miners', 'lucky-miners', 'Lottery mining made simple and profitable', 1),
('Bitaxe Miners', 'bitaxe-miners', 'Open-source mining hardware for enthusiasts', 2),
('Battle Pass', 'battle-pass', 'Exclusive rewards and mining benefits', 3),
('Accessories', 'accessories', 'Mining accessories and upgrades', 4),
('Power Supplies', 'power-supplies', 'High-efficiency power supplies', 5);

-- Paramètres du site
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Bitcoin Merch', 'text', 'Nom du site'),
('site_email', 'support@bitcoinmerch.com', 'text', 'Email de contact principal'),
('site_phone', '(877) 500-0282', 'text', 'Numéro de téléphone'),
('site_address', '21620 Lassen St, Chatsworth, CA 91311, USA', 'text', 'Adresse physique'),
('pool_hashrate', '1.57', 'number', 'Hashrate du pool en PH/s'),
('free_shipping_threshold', '400', 'number', 'Montant minimum pour livraison gratuite'),
('shipping_protection_fee', '1.50', 'number', 'Frais de protection Navidium'),
('tax_rate', '0.0', 'number', 'Taux de taxe par défaut');

-- Slides du carousel
INSERT INTO carousel_slides (image_url, title, subtitle, link_url, display_order) VALUES
('/ref/c1.JPG', 'Join the Battle Pass', 'Exclusive rewards and mining benefits', '/battle-pass', 1),
('/ref/c2.JPG', 'Must Go Warehouse Miners', 'Limited stock clearance', '/collections/lucky-miners', 2),
('/ref/c3.JPG', 'Free Shipping on Orders $400+', 'Fast delivery', '/collections/bitaxe-miners', 3),
('/ref/c4.JPG', 'Visit Our Store', 'California warehouse', '/support', 4),
('/ref/c5.JPG', 'Pay with Crypto', 'Bitcoin, Ethereum accepted', '/', 5);

-- =============================================
-- VUES UTILES POUR L'ADMIN
-- =============================================

-- Vue: Produits avec statistiques
CREATE VIEW v_products_stats AS
SELECT 
  p.id,
  p.name,
  p.slug,
  c.name as category_name,
  p.price,
  p.discount_price,
  p.stock,
  p.is_active,
  p.views_count,
  p.sales_count,
  COUNT(DISTINCT r.id) as reviews_count,
  COALESCE(AVG(r.rating), 0) as avg_rating,
  COUNT(DISTINCT pi.id) as images_count,
  p.created_at
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN reviews r ON p.id = r.product_id AND r.is_approved = TRUE
LEFT JOIN product_images pi ON p.id = pi.product_id
GROUP BY p.id, p.name, p.slug, c.name, p.price, p.discount_price, p.stock, 
         p.is_active, p.views_count, p.sales_count, p.created_at;

-- Vue: Statistiques des commandes
CREATE VIEW v_orders_stats AS
SELECT 
  DATE(created_at) as order_date,
  COUNT(*) as orders_count,
  SUM(total) as total_revenue,
  AVG(total) as avg_order_value,
  SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered_count,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;

-- Vue: Top produits vendus
CREATE VIEW v_top_products AS
SELECT 
  p.id,
  p.name,
  p.slug,
  COUNT(oi.id) as times_ordered,
  SUM(oi.quantity) as total_quantity_sold,
  SUM(oi.total) as total_revenue
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.slug
ORDER BY total_quantity_sold DESC
LIMIT 20;

-- =============================================
-- INDEX SUPPLÉMENTAIRES POUR PERFORMANCE
-- =============================================

-- Index pour recherche full-text sur produits
ALTER TABLE products ADD FULLTEXT INDEX idx_search (name, description);

-- Index composites pour filtres fréquents
CREATE INDEX idx_product_category_active ON products(category_id, is_active, price);
CREATE INDEX idx_order_status_date ON orders(status, created_at);
CREATE INDEX idx_review_product_approved ON reviews(product_id, is_approved, rating);

-- =============================================
-- FIN DU SCRIPT
-- =============================================
