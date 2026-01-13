-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 13 jan. 2026 à 15:18
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bitcoin_merch`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Hash bcrypt du mot de passe',
  `role` enum('super_admin','admin','editor') COLLATE utf8mb4_unicode_ci DEFAULT 'admin',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`, `avatar`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'admin@bitcoinmerch.com', '$2b$10$Ff6VurIy98lE/dUyQGYLgeOnfxkiHWk2Mc/piudAwF7mrOl96kcrO', 'super_admin', NULL, 1, '2026-01-12 16:32:23', '2026-01-09 15:46:59', '2026-01-12 15:32:23');

-- --------------------------------------------------------

--
-- Structure de la table `carousel_slides`
--

DROP TABLE IF EXISTS `carousel_slides`;
CREATE TABLE IF NOT EXISTS `carousel_slides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_text` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_active` (`is_active`),
  KEY `idx_order` (`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `carousel_slides`
--

INSERT INTO `carousel_slides` (`id`, `image_url`, `title`, `subtitle`, `link_url`, `button_text`, `is_active`, `display_order`, `created_at`, `updated_at`) VALUES
(1, '/ref/c1.JPG', 'Join the Battle Pass', 'Exclusive rewards and mining benefits', '/battle-pass', NULL, 1, 1, '2026-01-09 15:46:59', '2026-01-09 15:46:59'),
(2, '/ref/c2.JPG', 'Must Go Warehouse Miners', 'Limited stock clearance', '/collections/lucky-miners', NULL, 1, 2, '2026-01-09 15:46:59', '2026-01-09 15:46:59'),
(3, '/ref/c3.JPG', 'Free Shipping on Orders $400+', 'Fast delivery', '/collections/bitaxe-miners', NULL, 1, 3, '2026-01-09 15:46:59', '2026-01-09 15:46:59'),
(4, '/ref/c4.JPG', 'Visit Our Store', 'California warehouse', '/support', NULL, 1, 4, '2026-01-09 15:46:59', '2026-01-09 15:46:59'),
(5, '/ref/c5.JPG', 'Pay with Crypto', 'Bitcoin, Ethereum accepted', '/', NULL, 1, 5, '2026-01-09 15:46:59', '2026-01-09 15:46:59');

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `is_active`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 'Lucky Miners', 'lucky-miners', 'Lottery mining made simple and profitable', NULL, 1, 1, '2026-01-09 15:46:59', '2026-01-12 15:23:32'),
(2, 'Bitaxe Miners', 'bitaxe-miners', 'Open-source mining hardware for enthusiasts', NULL, 1, 2, '2026-01-09 15:46:59', '2026-01-09 15:46:59'),
(3, 'Battle Pass', 'battle-pass', 'Exclusive rewards and mining benefits', NULL, 1, 3, '2026-01-09 15:46:59', '2026-01-09 15:46:59'),
(4, 'Accessories', 'accessories', 'Mining accessories and upgrades', NULL, 1, 4, '2026-01-09 15:46:59', '2026-01-09 15:46:59'),
(5, 'Power Supplies', 'power-supplies', 'High-efficiency power supplies', NULL, 1, 5, '2026-01-09 15:46:59', '2026-01-09 15:46:59');

-- --------------------------------------------------------

--
-- Structure de la table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('new','read','replied','closed') COLLATE utf8mb4_unicode_ci DEFAULT 'new',
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_status` (`status`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `newsletter_subscribers`
--

DROP TABLE IF EXISTS `newsletter_subscribers`;
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `subscribed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipping_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_zip` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping_country` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'United States',
  `subtotal` decimal(10,2) NOT NULL,
  `shipping_cost` decimal(10,2) DEFAULT '0.00',
  `tax` decimal(10,2) DEFAULT '0.00',
  `discount` decimal(10,2) DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'credit, paypal, crypto, etc.',
  `payment_status` enum('pending','paid','failed','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `shipping_protection` tinyint(1) DEFAULT '0',
  `order_instructions` text COLLATE utf8mb4_unicode_ci,
  `tracking_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shipped_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `idx_order_number` (`order_number`),
  KEY `idx_email` (`customer_email`),
  KEY `idx_status` (`status`),
  KEY `idx_payment_status` (`payment_status`),
  KEY `idx_created` (`created_at`),
  KEY `idx_order_status_date` (`status`,`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int DEFAULT NULL COMMENT 'Peut être NULL si produit supprimé',
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `variant_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order` (`order_id`),
  KEY `idx_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `long_description` longtext COLLATE utf8mb4_unicode_ci COMMENT 'Description détaillée avec features, specs, etc.',
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` decimal(8,2) DEFAULT NULL COMMENT 'Poids en kg',
  `dimensions` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Ex: 10x5x3 cm',
  `is_featured` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views_count` int DEFAULT '0',
  `sales_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `sku` (`sku`),
  KEY `idx_slug` (`slug`),
  KEY `idx_category` (`category_id`),
  KEY `idx_active` (`is_active`),
  KEY `idx_featured` (`is_featured`),
  KEY `idx_price` (`price`),
  KEY `idx_product_category_active` (`category_id`,`is_active`,`price`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `description`, `long_description`, `price`, `discount_price`, `stock`, `sku`, `weight`, `dimensions`, `is_featured`, `is_active`, `meta_title`, `meta_description`, `views_count`, `sales_count`, `created_at`, `updated_at`) VALUES
(1, 1, 'dsdsq', 'dsdsq', 'dsq', NULL, 9000.00, 7000.00, 1, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-09 16:46:56', '2026-01-10 22:31:27'),
(2, 1, 'Bitcoin Merch® - Lot de 6 miniers de loterie de pépites d\'or', 'bitcoin-merch-lot-de-6-miniers-de-loterie-de-p-pites-d-or', 'Combo de 6x Mineur de pépites d\'or\n6 fois plus de machines - 6 fois plus de chances d\'extraire un bloc !\n\n✔️ Support USB et 6 mineurs Gold Nugget inclus !\n✔️ 6 fois plus de chances de gagner 3,125 BTC toutes les 10 minutes !\n✔️ Branchez, configurez et n\'y pensez plus !\n✔️ USB-C 1 W : moins de 0,66 $ par mois pour faire fonctionner les 6 mineurs.\n✔️ Conçu, assemblé et expédié depuis la Californie. \n✔️ Garantie 1 an : assistance complète.', NULL, 601.99, 300.99, 25, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-12 15:36:04', '2026-01-12 15:36:04');

-- --------------------------------------------------------

--
-- Structure de la table `product_features`
--

DROP TABLE IF EXISTS `product_features`;
CREATE TABLE IF NOT EXISTS `product_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `feature_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product` (`product_id`),
  KEY `idx_primary` (`is_primary`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `alt_text`, `is_primary`, `display_order`, `created_at`) VALUES
(28, 1, '/uploads/1768223616047-aa.webp', NULL, 1, 1, '2026-01-12 13:13:37'),
(29, 1, '/uploads/1767977212070-1.jpeg', NULL, 0, 2, '2026-01-12 13:13:37'),
(30, 1, '/uploads/1767977215090-3.jpeg', NULL, 0, 3, '2026-01-12 13:13:37'),
(31, 2, '/uploads/1768232145537-1.webp', NULL, 1, 1, '2026-01-12 15:36:04'),
(32, 2, '/uploads/1768232150110-2.webp', NULL, 0, 2, '2026-01-12 15:36:04'),
(33, 2, '/uploads/1768232152876-3.webp', NULL, 0, 3, '2026-01-12 15:36:04'),
(34, 2, '/uploads/1768232155368-4.webp', NULL, 0, 4, '2026-01-12 15:36:04'),
(35, 2, '/uploads/1768232157777-5.webp', NULL, 0, 5, '2026-01-12 15:36:04'),
(36, 2, '/uploads/1768232162987-6.webp', NULL, 0, 6, '2026-01-12 15:36:04');

-- --------------------------------------------------------

--
-- Structure de la table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
CREATE TABLE IF NOT EXISTS `product_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Ex: Standard / Orange',
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price_adjustment` decimal(10,2) DEFAULT '0.00' COMMENT 'Ajustement de prix (+/-)',
  `stock` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`),
  KEY `idx_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `customer_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` tinyint NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `is_verified` tinyint(1) DEFAULT '0' COMMENT 'Achat vérifié',
  `is_approved` tinyint(1) DEFAULT '0' COMMENT 'Approuvé par admin',
  `helpful_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product` (`product_id`),
  KEY `idx_approved` (`is_approved`),
  KEY `idx_rating` (`rating`),
  KEY `idx_review_product_approved` (`product_id`,`is_approved`,`rating`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_unicode_ci,
  `setting_type` enum('text','number','boolean','json') COLLATE utf8mb4_unicode_ci DEFAULT 'text',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`),
  KEY `idx_key` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`, `setting_type`, `description`, `updated_at`) VALUES
(1, 'site_name', 'Bitcoin Merch', 'text', 'Nom du site', '2026-01-09 15:46:59'),
(2, 'site_email', 'support@bitcoinmerch.com', 'text', 'Email de contact principal', '2026-01-09 15:46:59'),
(3, 'site_phone', '(877) 500-0282', 'text', 'Numéro de téléphone', '2026-01-09 15:46:59'),
(4, 'site_address', '21620 Lassen St, Chatsworth, CA 91311, USA', 'text', 'Adresse physique', '2026-01-09 15:46:59'),
(5, 'pool_hashrate', '1.57', 'number', 'Hashrate du pool en PH/s', '2026-01-09 15:46:59'),
(6, 'free_shipping_threshold', '400', 'number', 'Montant minimum pour livraison gratuite', '2026-01-09 15:46:59'),
(7, 'shipping_protection_fee', '1.50', 'number', 'Frais de protection Navidium', '2026-01-09 15:46:59'),
(8, 'tax_rate', '0.0', 'number', 'Taux de taxe par défaut', '2026-01-09 15:46:59');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_orders_stats`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `v_orders_stats`;
CREATE TABLE IF NOT EXISTS `v_orders_stats` (
`avg_order_value` decimal(14,6)
,`delivered_count` decimal(23,0)
,`order_date` date
,`orders_count` bigint
,`pending_count` decimal(23,0)
,`total_revenue` decimal(32,2)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_products_stats`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `v_products_stats`;
CREATE TABLE IF NOT EXISTS `v_products_stats` (
`avg_rating` decimal(7,4)
,`category_name` varchar(100)
,`created_at` timestamp
,`discount_price` decimal(10,2)
,`id` int
,`images_count` bigint
,`is_active` tinyint(1)
,`name` varchar(255)
,`price` decimal(10,2)
,`reviews_count` bigint
,`sales_count` int
,`slug` varchar(255)
,`stock` int
,`views_count` int
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_top_products`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `v_top_products`;
CREATE TABLE IF NOT EXISTS `v_top_products` (
`id` int
,`name` varchar(255)
,`slug` varchar(255)
,`times_ordered` bigint
,`total_quantity_sold` decimal(32,0)
,`total_revenue` decimal(32,2)
);

-- --------------------------------------------------------

--
-- Structure de la vue `v_orders_stats`
--
DROP TABLE IF EXISTS `v_orders_stats`;

DROP VIEW IF EXISTS `v_orders_stats`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_orders_stats`  AS SELECT cast(`orders`.`created_at` as date) AS `order_date`, count(0) AS `orders_count`, sum(`orders`.`total`) AS `total_revenue`, avg(`orders`.`total`) AS `avg_order_value`, sum((case when (`orders`.`status` = 'delivered') then 1 else 0 end)) AS `delivered_count`, sum((case when (`orders`.`status` = 'pending') then 1 else 0 end)) AS `pending_count` FROM `orders` GROUP BY cast(`orders`.`created_at` as date) ORDER BY `order_date` DESC ;

-- --------------------------------------------------------

--
-- Structure de la vue `v_products_stats`
--
DROP TABLE IF EXISTS `v_products_stats`;

DROP VIEW IF EXISTS `v_products_stats`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_products_stats`  AS SELECT `p`.`id` AS `id`, `p`.`name` AS `name`, `p`.`slug` AS `slug`, `c`.`name` AS `category_name`, `p`.`price` AS `price`, `p`.`discount_price` AS `discount_price`, `p`.`stock` AS `stock`, `p`.`is_active` AS `is_active`, `p`.`views_count` AS `views_count`, `p`.`sales_count` AS `sales_count`, count(distinct `r`.`id`) AS `reviews_count`, coalesce(avg(`r`.`rating`),0) AS `avg_rating`, count(distinct `pi`.`id`) AS `images_count`, `p`.`created_at` AS `created_at` FROM (((`products` `p` left join `categories` `c` on((`p`.`category_id` = `c`.`id`))) left join `reviews` `r` on(((`p`.`id` = `r`.`product_id`) and (`r`.`is_approved` = true)))) left join `product_images` `pi` on((`p`.`id` = `pi`.`product_id`))) GROUP BY `p`.`id`, `p`.`name`, `p`.`slug`, `c`.`name`, `p`.`price`, `p`.`discount_price`, `p`.`stock`, `p`.`is_active`, `p`.`views_count`, `p`.`sales_count`, `p`.`created_at` ;

-- --------------------------------------------------------

--
-- Structure de la vue `v_top_products`
--
DROP TABLE IF EXISTS `v_top_products`;

DROP VIEW IF EXISTS `v_top_products`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_top_products`  AS SELECT `p`.`id` AS `id`, `p`.`name` AS `name`, `p`.`slug` AS `slug`, count(`oi`.`id`) AS `times_ordered`, sum(`oi`.`quantity`) AS `total_quantity_sold`, sum(`oi`.`total`) AS `total_revenue` FROM (`products` `p` join `order_items` `oi` on((`p`.`id` = `oi`.`product_id`))) GROUP BY `p`.`id`, `p`.`name`, `p`.`slug` ORDER BY `total_quantity_sold` DESC LIMIT 0, 20 ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `products`
--
ALTER TABLE `products` ADD FULLTEXT KEY `idx_search` (`name`,`description`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT;

--
-- Contraintes pour la table `product_features`
--
ALTER TABLE `product_features`
  ADD CONSTRAINT `product_features_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
