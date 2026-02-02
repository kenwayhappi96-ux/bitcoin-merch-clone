-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 02 fév. 2026 à 11:43
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
(1, 'Super Admin', 'admin@bitcoinmerch.com', '$2b$10$Ff6VurIy98lE/dUyQGYLgeOnfxkiHWk2Mc/piudAwF7mrOl96kcrO', 'super_admin', NULL, 1, '2026-02-02 11:09:07', '2026-01-09 15:46:59', '2026-02-02 10:09:07');

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `description`, `long_description`, `price`, `discount_price`, `stock`, `sku`, `weight`, `dimensions`, `is_featured`, `is_active`, `meta_title`, `meta_description`, `views_count`, `sales_count`, `created_at`, `updated_at`) VALUES
(1, 3, 'Bitcoin Merch® - Bitcoin Battle Pass ', 'bitcoin-merch-bitcoin-battle-pass', 'Become a pioneer in the home mining community. Join the exclusive monthly membership. 10% off code sent via email after purchase.\n\n⭐10% Off Everything From Bitcoin Merch\n⭐️Stackable Discount Up To 15% Off\n⭐Free Gift In Your 1st Order\n⭐Extended Warranty On Items Bought During Duration Of Membership\n⭐Priority Order Processing & Dedicated Customer Support\n⭐Full Access To Active Telegram Mining Posse \n⭐Access to our White Label Program, start selling lucky miners', NULL, 13.99, 6.99, 1, NULL, NULL, NULL, 1, 1, NULL, NULL, 0, 0, '2026-01-09 16:46:56', '2026-02-02 10:11:04'),
(2, 1, 'Bitcoin Merch® - Lot de 6 miniers de loterie de pépites d\'or', 'bitcoin-merch-lot-de-6-miniers-de-loterie-de-p-pites-d-or', 'Combo de 6x Mineur de pépites d\'or\n6 fois plus de machines - 6 fois plus de chances d\'extraire un bloc !\n\n✔️ Support USB et 6 mineurs Gold Nugget inclus !\n✔️ 6 fois plus de chances de gagner 3,125 BTC toutes les 10 minutes !\n✔️ Branchez, configurez et n\'y pensez plus !\n✔️ USB-C 1 W : moins de 0,66 $ par mois pour faire fonctionner les 6 mineurs.\n✔️ Conçu, assemblé et expédié depuis la Californie. \n✔️ Garantie 1 an : assistance complète.', NULL, 601.99, 300.99, 25, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-12 15:36:04', '2026-01-26 12:33:56'),
(3, 1, 'Bitcoin Merch® - Mineur de loterie de pépites d\'or', 'bitcoin-merch-mineur-de-loterie-de-p-pites-d-or', 'Introducing the Ultimate Plug & Play All-in-One Solo Bitcoin Miner with WIFI, RGB LEDs, and a Live BTC Price Ticker!\n\n✔️ Chance to win 3.125 BTC every 10 minutes!\n✔️ Plug in, set it, and forget it\n✔️ USB-C 1W - Less than $0.02 a month to run\n✔️ Designed, assembled and shipped from California \n✔️ 1 Year Warranty - Full Support', NULL, 100.99, 50.99, 100, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-16 14:50:24', '2026-01-29 09:50:29'),
(4, 1, 'Bitcoin Merch® - Chercheur d\'or et mineur de loterie', 'bitcoin-merch-chercheur-d-or-et-mineur-de-loterie', 'The Gold Digger Lottery Miner is a compact, WiFi-enabled Bitcoin solo miner designed for learning and fun.\n\n✔️ Chance to win 3.125 BTC every 10 minutes!\n✔️ Optimized firmware delivers 1060 KH/s and boosts lottery odds by 20x.\n✔️  Pocket-sized: 1.7” x 1.4” x 1.6”.\n✔️  Tap the top button to switch to desktop clock mode while still mining.\n✔️  Consumes less energy than a single LED bulb.\n✔️  No External computer needed.', NULL, 100.99, 50.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-29 09:58:48', '2026-01-29 09:59:05'),
(5, 1, 'Bitcoin Merch® - Mineur de loterie USB', 'bitcoin-merch-mineur-de-loterie-usb', 'Écran large Nerd Miner - Livraison sous 8 semaines*\nContactez le support pour plus d\'informations : support@bitcoinmerch.com\n\n✔️ Tentez de gagner 3,125 BTC toutes les 10 minutes.\n✔️ Mineur WiFi prêt à l\'emploi : aucun ordinateur requis.\n✔️ Consommation d\'énergie inférieure à celle d\'une veilleuse (~0,71 W).\n✔️ Appareil compact et économique, idéal pour apprendre et expérimenter.', NULL, 58.99, 29.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-29 10:03:22', '2026-01-29 10:03:22'),
(6, 1, 'Bitcoin Merch® NerdMiner v2 - USB Lottery Miner with Screen', 'bitcoin-merch-nerdminer-v2-usb-lottery-miner-with-screen', 'Educational Tool\nThe NerdMiner V2 is an excellent way to learn about mining. Ideal for beginners, it provides hands-on experience in the cryptocurrency world.\n\nBitcoin Lottery\nParticipate in the Bitcoin lottery with NerdMiner V2. Every 10 minutes, you have a chance to hit a block and potentially earn 3.125 bitcoins. It’s like having a personal gold rush every 10 minutes!\n\nJoin the Mining Community\nWhen you buy the NerdMiner V2, you’re joining a community of crypto enthusiasts. Be a part of our mining family and become a block buster!', NULL, 58.99, 29.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-29 10:08:06', '2026-01-29 10:08:06'),
(7, 2, 'Bitcoin Merch® - NerdAxe BTC Miner w/ Power Supply', 'bitcoin-merch-nerdaxe-btc-miner-w-power-supply', 'Unleash the power of a Bitcoin ASIC miner with the vibrant, full-color display you love. \nAchieving approximately 1.2 TH/s with an impressive energy efficiency of 17 J/TH, the NerdAxe Gamma  is both powerful and efficient. Setting it up is a breeze through the intuitive AxeOS web interface, where you can easily configure settings, monitor performance, and manage your operations.\nKey Features:\nPowerful Mining: Equipped with Bitmain’s cutting-edge BM1370 chip.\nVibrant Display: Features full-color graphics on a 1.9-inch IPS screen.\nUser-Friendly Control: Simple setup and monitoring via the built-in AxeOS web portal.\nOpen-Source Firmware: Runs on a custom version of ESP-miner and AxeOS for complete control.\nEfficient Power: Standard 5V DC power supply (5A minimum).', NULL, 333.99, 166.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-29 10:17:06', '2026-01-29 10:17:28'),
(8, 2, 'Bitcoin Merch® - Bitaxe Gamma Lottery Mine Standar + Power Supply Upto 1.2TH/s', 'bitcoin-merch-bitaxe-gamma-lottery-mine-standar-power-supply-upto-1-2th-s', 'Introducing the Ultimate All-in-One Lottery Bitcoin Miner with WIFI & OLEDs. 2025\'s Most Successful BTC Block Hitter!\n\n✔️ Runs over Wifi, and it is silent, perfect for display\n✔️ Consumes less than 🌿15 watts, as little as a single LED bulb\n✔️ Designed, assembled and shipped from California \n ✔️ 30 Day Warranty - Full Support', NULL, 225.99, 112.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-29 10:27:50', '2026-01-29 10:27:50'),
(9, 2, 'Bitcoin Merch® - NerdQAxe++ 5TH/s Multi-Chip BTC Miner', 'bitcoin-merch-nerdqaxe-5th-s-multi-chip-btc-miner', 'Revolutionize Your Home Mining Setup with the NerdQaxe++ – The Ultimate Energy-Efficient Open-Source ASIC Miner for Bitcoin & Cryptocurrency Enthusiasts!\n\n✔️ Set it up with your phone or PC in minutes!\n✔️ Runs over Wifi, and it is silent, perfect for home or office display\n✔️ Consumes🌿80 watts, energy efficient\n✔️ Designed, assembled and shipped from California \n ✔️ Full Warranty - Full Customer Support', NULL, 834.99, 417.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-01-29 10:29:28', '2026-01-29 10:29:28'),
(10, 1, 'Bitcoin Merch® - VolcMiner Mini 2.2Gh/s', 'bitcoin-merch-volcminer-mini-2-2gh-s', 'VolcMiner Mini is an ASIC miner designed for Scrypt algorithm, specifically targeting DOGE (Dogecoin) and LTC (Litecoin). It delivers a maximum hashrate of 2.2Gh/s while consuming 500W of power, resulting in an energy efficiency of 0.227j/Mh.\n\n\nSpecifications\nManufacturer	VolcMiner\nModel	Mini\nAlso known as	VolcMiner Mini\nRelease	Jan 2025\nSize	133 x 202 x 173mm\nWeight	3700g\nNoise level	55db\nPower	500W\nInterface	Ethernet\nTemperature	5 - 45 °C\nHumidity	5 - 95 %', NULL, 1.69, 1.40, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 10:17:52', '2026-02-02 10:18:03'),
(11, 1, 'Bitcoin Merch® - Fluminer L2 1.2GH/s DOGE and LTC Miner + Bluetooth Speaker', 'bitcoin-merch-fluminer-l2-1-2gh-s-doge-and-ltc-miner-bluetooth-speaker', 'Specifications\nManufacturer	Fluminer\nModel	L2\nHashrate	1.2GH/s\nEfficiency	0.23J/MH\nSize	160 x 160 x 320mm\nNoise level	≤ 40dB\nPower	280W±10% (Watts)\nInterface	WiFi / Ethernet\nTemperature	0 - 40°C\nWeight	6.5 KG', NULL, 101299.00, 843.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 10:19:57', '2026-02-02 10:19:57'),
(12, 1, 'Bitcoin Merch® - Jingleminer BTC Lottery Mini Lottery Miner', 'bitcoin-merch-jingleminer-btc-lottery-mini-lottery-miner', 'Introducing the Jingleminer BTC SOLO Mini Lottery Miner.\nPowerful Features:\nHashrate: 75KH/s for efficient mining\nCryptocurrency: BTC Solo for individual miners\nFlash: 16MB for seamless performance\nPSRAM: 8MB for smooth data processing\nWorking Power Supply: 3.3V for energy efficiency\nUser-Friendly Design:\n\nConnector: JST-GH 1.25mm 2-pin for easy setup\nChip: ESP32-S3 for reliable processing\nModel Number: T-Display-S3 for a sleek design\nType: Bluetooth and WIFI connectivity for convenience\nQuality and Origin:\n\nMade in Mainland China with high-quality components\nPackage included for a hassle-free experience\nCompatible with Display Equipment audio and video styles\nStep into the world of efficient and reliable Bitcoin mining with the Jingleminer BTC SOLO Mini Lottery Miner.', NULL, 168.99, 84.95, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 10:24:23', '2026-02-02 10:24:23'),
(13, 1, 'Bitcoin Merch® - Braiins Mini Miner - BMM 101', 'bitcoin-merch-braiins-mini-miner-bmm-101', 'The BMM 101 is an upgrade on its predecessor, the BMM 100, in the following ways:\n\nWi-Fi connectivity (Ethernet port still available)\nLarger display with new screen options\nImproved cooling for better performance and silent operation\nMODERN DAY LOTTERY\n\nPlay the solo bitcoin mining lottery with the BMM 101 while learning how to set up and maintain a bitcoin mining ASIC. Our compact, sleek device blends into your living room, office, or desk and is a must-buy for any bitcoiner that wants the coolest technology out there.\n\nExpected 1 TH/s hashrate with 40W consumption and silent operation at 40 dB\nBITCOIN CLOCK\n\nStay updated on every key bitcoin mining metric with a screen that displays current hashrate, miner temperature, power consumption, uptime, IP address, bitcoin price, block height, network difficulty, date, and time. Additional metrics and viewing options will be available too – it’s up to you. For the simpler route, you can choose to only see time or bitcoin price.\n\nDimensions of the device are 135 × 70 × 215 mm (5.31 × 2.76 × 8.46 in)\nEASY SETUP\n\nSetup takes only minutes thanks to the simple plug-and-play nature of the BMM 101. The BMM 101 comes equipped with a PSU with US or EU plug options available. Users can mine on any mining pool or try and find entire blocks on their own. The choice is yours. Just plug it in and let the sat stacking begin!', NULL, 757.99, 378.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 10:29:09', '2026-02-02 10:29:09'),
(15, 1, 'Bitcoin Merch® 4 x GekkoScience COMPAC F with Fan Upgrade + 10-Port USB Hub - COMBO Up to 1.4+TH/s', 'bitcoin-merch-4-x-gekkoscience-compac-f-with-fan-upgrade-10-port-usb-hub-combo-up-to-1-4-th-s', '*Made in the USA,\nShips within 4 business days.\n** Some programming with Git is required on Linux to be able to mine on this new USB Miner. However, you can add to this kit our Raspberry Pi computer with Compac F preinstalled for easy beginner mining. Git file available here - https://github.com/kanoi/cgminer add to the line of code for mining \"--gekko-compacf-freq 400\"\n\nOr download the Windows files here\n\nThis combo includes:\n\n4 x GekkoScience COMPAC F (BM1397) USB Stickminers 270-350GH/s 7nm chip miner.\n\n4 x Bitcoin Merch® USB Miner Fan Upgrade.\n\n1 x Bitcoin Merch® 10 Port Powered USB Hub.', NULL, 101299.00, 506.99, 1, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 10:45:53', '2026-02-02 10:45:53'),
(16, 2, 'Bitcoin Merch® DOGE Digger Lottery Miner 105MH/s SCRYPT LTC/Doge', 'bitcoin-merch-doge-digger-lottery-miner-105mh-s-scrypt-ltc-doge', '🐕 DOGE Digger™ – The World’s First DOGE Coin Lottery Miner\nMeet the DOGE Digger™, the first-of-its-kind SCRYPT home lottery miner built for Dogecoin fans who want a shot at something big. Whether you’re new to mining or a seasoned crypto enthusiast, DOGE Digger makes SCRYPT mining simple, efficient, and exciting.\n\nThis compact powerhouse delivers ~105 MH/s while using only ~25 watts, making it one of the most energy-efficient SCRYPT miners available. Pool mine for steady rewards or solo mine Dogecoin for a chance to hit the ultimate lottery.\n\n🎰 Why It’s Special: The Dogecoin Lottery Miner\nDOGE Digger is the first miner ever designed specifically for Dogecoin solo lottery mining. Solo miners have a chance to discover a full Dogecoin block and earn 10,000 DOGE (≈ $1,500), with odds of approximately 1 in 21,000 per day, depending on network hash rate.\n\nLow power, low noise, massive upside.\n\n💰 What It Can Earn\nMine multiple SCRYPT-based cryptocurrencies, including:\n\nDogecoin (DOGE)\n\nLitecoin (LTC)\n\nLuckycoin\n\nBells\n\nPepeCoin\n\nJunkcoin\n\nDingoCoin\n\nCatcoin\n\nDigiByte\n\nGoldCoin\n\nAuroracoin', NULL, 548.99, 337.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 10:57:50', '2026-02-02 10:57:50'),
(17, 2, 'Bitcoin Merch® - Bitaxe Touch - 1TH/s', 'bitcoin-merch-bitaxe-touch-1th-s', 'PRE-ORDER - NO ETA of shipment as of 12/7/25\nMeet Bitaxe Touch™, the first touch‑screen Bitcoin miner made for your desk. It hums quietly, mines a steady hash rate to protect the network, and doubles as a sleek digital clock. \n\nBitaxe Touch™ is our answer—a stylish, plug‑and‑play miner that brings the mission home. Because when more people mine, we all defend sound money.\n\nBitcoin Stats at a Glance\nReal-time BTC/USD price\n\nCurrent network fees and recommended tiers\n\nNetwork difficulty & global hash rate\n\nBlock height & countdown to next halving\n\nElegant Digital Clock\nDesigned and manufactured in anodized aluminum\n\nMinimal, modern aesthetic that complements any home or office\n\nBuilt-in brightness control and night-mode dimming\n\nWhisper-quiet fans and pass-through cooling for minimal heat and noise\n\nBeautiful Touch Display\n4.3″ 800×480 capacitive touchscreen\n\nIntuitive, tap-through menus—no downloads required\n\nLive mining metrics & device settings at your fingertips\n\nPlug-and-play: connect to Wi-Fi, scan a QR code, enter your BTC address, and mine immediately\n\nManufactured by ACS in Texas USA', NULL, 548.99, 274.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 10:59:53', '2026-02-02 10:59:53'),
(18, 2, 'Bitcoin Merch® - Bitaxe Gamma Bitcoin Miner \"Black Ice\" Edition', 'bitcoin-merch-bitaxe-gamma-bitcoin-miner-black-ice-edition', 'Introducing the Bitaxe Gamma – Black Edition: The premium miner, perfected.\n\nThe Black Edition – Overview:\n\nBitaxe Gamma – expertly fitted with:\n\nThe “BitHalo” by I Am GPIO: A bespoke lighting add-on that not only adds a touch of interaction but also features rear power entry, eliminating the need for messy side cables.\nLatest Update: The BitHalo now includes a rear button that lets you customize the pulse color. All colors come preloaded—simply press the button to select your favorite. Can’t decide between red or blue? No problem! Enjoy them all, or flip the switch to turn it off entirely.\nThe BitHalo also adds rear fan capability: Add a second Black Magic Fan (sold seperately) for superb rear cooling, increased hashrate and a happier V-REG Chip. It’s plug and play with on board speed control.\nCustom “Bitchin’ Sink\'” Black Aluminium Heatsink by I Am GPIO – Crafted for superior heat dissipation, enabling seamless overclocking.\n8mm CNC-Milled Black Aluminum Stands: Built for added durability and efficient heat dissipation.\nThe “Black Magic” Ultra-Quiet Fan: Rivals the legendary Noctua Silent fan, offering whisper-quiet operation and unparalleled cooling.\n5.2V 6A Custom “ThunderVolt” power supply included.\nUtilising the BM1370 Bitmain chip from the Bitmain S21 miner, this standalone miner packs a huge punch! Mining up to 1.2 TH/s stock (up to 1.6 TH/s or so with overclocking), the Bitaxe Gamma is designed to be incredibly power efficient and easy to use.\n\nAn integrated ESP32 controller hosts a local web page for configuration and information, with built-in wireless networking—meaning no external computer is necessary.', NULL, 506.99, 253.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:03:29', '2026-02-02 11:03:29'),
(19, 2, 'Bitcoin Merch® - Bitaxe Gamma Bitcoin Miner “Ice Angel” Edition', 'bitcoin-merch-bitaxe-gamma-bitcoin-miner-ice-angel-edition', 'Introducing the ‘Bitaxe Gamma – The Angel’s Share’. The premium miner, perfected.\n\nCrafted by I Am GPIO of The Solo Mining Co, the ‘Bitaxe Gamma – The Angel’s Share’ edition has been designed with aesthetics, quality, and performance in mind. Here’s what makes it shine:\n\nThe Bitaxe Gamma – ‘The Angel’s Share’  – Overview:\n\nA White Bitaxe Gamma – expertly fitted with:\n\nThe “BitHalo” by I Am GPIO: A bespoke lighting add-on that not only adds a touch of interaction but also features rear power entry, eliminating the need for messy side cables.\nLatest Update: The BitHalo now includes a rear button that lets you customize the pulse color. All colors come preloaded—simply press the button to select your favorite. Can’t decide between red or blue? No problem! Enjoy them all, or flip the switch to turn it off entirely.\nThe BitHalo also adds rear fan capability: Add a second Black Magic Fan (sold seperately) for superb rear cooling, increased hashrate and a happier V-REG Chip. It’s plug and play with on board speed control.\nCustom “Bitchin’ Sink\'” Polished Aluminium Heatsink by I Am GPIO – Crafted for superior heat dissipation, enabling seamless overclocking.\n8mm CNC-Milled Polished Aluminum Stands: Built for added durability and efficient heat dissipation.\nThe “Black Magic” Ultra-Quiet Fan: Rivals the legendary Noctua Silent fan, offering whisper-quiet operation and unparalleled cooling – complete with white shroud.\n5.2V 6A Custom “ThunderVolt” power supply included.\nUtilising the BM1370 Bitmain chip from the Bitmain S21 miner, this standalone miner packs a huge punch! Mining up to 1.2 TH/s stock (up to 1.6 TH/s or so with overclocking), the Bitaxe Gamma is designed to be incredibly power efficient and easy to use.', NULL, 506.99, 253.99, 50, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:05:11', '2026-02-02 11:05:11'),
(20, 2, 'Bitcoin Merch® - Bitaxe SupraHex 4.2+ TH/s Bitcoin Miner', 'bitcoin-merch-bitaxe-suprahex-4-2-th-s-bitcoin-miner', 'Bitaxe SupraHex: \nUnleash the power of cryptocurrency mining with the Bitaxe SupraHex. Equipped with six state-of-the-art ASIC chips, this device delivers an impressive performance of 4.2+ TH/S. Available in the Deluxe version—this powerful miner follows the iconic Hex design, providing both functionality and aesthetics.\n\nKey Features:\nHigh Performance: Achieves 4.2+ TH/s \nEnhanced Stability: Features Transient Voltage Suppressor (TVS) diodes to improve power regulator stability.\nAdvanced Thermal Monitoring: Includes a 7-channel temperature monitoring system for precise thermal management (compatible firmware coming soon).\nUpgraded Cooling System: Equipped with a new fan capable of 6500 RPM for optimal cooling in high-temperature environments. Fan speed can be manually adjusted via AxeOS for noise control.\nSafety Warning: Fan activates automatically upon power connection; avoid contact. Fan guards are available upon request.\nPre-installed Firmware: Our firmware has been rigorously tested for reliability. Using incompatible firmware may result in issues like WiFi disconnection or hardware damage.\nPower Supply Included: Comes with a PSU and a power cord.\nElevate your mining experience with the Bitaxe SupraHex!', NULL, 759.99, 379.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:08:19', '2026-02-02 11:08:19'),
(21, 2, 'Bitcoin Merch® Bitaxe Ultra 1366 + Power Supply Bitcoin Miner 425GH/s+', 'bitcoin-merch-bitaxe-ultra-1366-power-supply-bitcoin-miner-425gh-s', 'Welcome to the future of cryptocurrency mining with the Bitaxe 1366\nthe world\'s smallest and most efficient miner, proudly brought to you by Bitcoin Merch. This groundbreaking, third major iteration in our Bitaxe series boasts the game-changing BM1366 ASIC from the esteemed S19XP.\n\n🔥 Unparalleled Efficiency:\nUnleash mining hash rates exceeding 500 GH/s with an astonishingly low power consumption of just 20W. The Bitaxe 1366 perfectly balances raw power with energy efficiency. The standard mining speed is 425 GH/s at only 11W of power consumption.\n\n💡 Fully Programmable and Adjustable:\nWith open-source software, hardware, and firmware, the Bitaxe 1366 offers unparalleled customization. If you\'re tech-savvy, take full control of your mining rig and make it truly your own. The built-in, detachable screen provides real-time mining stats for on-the-fly adjustments.\n\n🔌 Plug-and-Play Simplicity:\nYour Bitaxe 1366 is ready to mine straight out of the box, complete with a universal 110V - 230V power supply that ensures you can operate globally without a hitch.\n\n🌍 Global Versatility:\nWherever your location, the Bitaxe 1366 is your international passport to mining excellence.\n\n❄️ Built-In Cooling:\nAn integrated dual ball-bearing fan guarantees maximum lifespan and keeps your Bitaxe 1366 running cool and efficient.', NULL, 168.99, 84.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:11:22', '2026-02-02 11:11:22'),
(22, 2, 'Bitcoin Merch® - NerdQAxe + 2.4TH/s BTC Miner', 'bitcoin-merch-nerdqaxe-2-4th-s-btc-miner', 'NerdQaxe+ is a fully open-source Bitcoin ASIC miner equipped with 4 BM1368 ASIC chip from Antminer’s S21.T his design ensures efficient and powerful mining capabilities, achieving 2,5TH/s at an energy efficiency of ~20W/TH. It operates using a 12v 6A power supply.\n\nAt the core of NerdQaxe+ is the combination of ESP-miner and AxeOS, an open-source firmware that empowers you with full control over your mining operations. The intuitive web interface simplifies setting adjustments and performance monitoring, making mining more accessible and streamlined. NerdQaxe+ is an open-source miner based on Bitaxe project, designed to boost the hashing power of your NerdMiner.', NULL, 641.99, 320.99, 0, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:12:28', '2026-02-02 11:12:28'),
(23, 2, 'Bitcoin Merch® - Zyber 8S 6.4+TH/s High Performance Home Bitcoin Miner', 'bitcoin-merch-zyber-8s-6-4-th-s-high-performance-home-bitcoin-miner', 'Unlock next-level mining efficiency with the Zyber 8S, delivering an impressive 6.4+ TH/s of processing power. Engineered for both newcomers and seasoned miners, this high-performance device is optimized for home use while maintaining industrial-grade reliability.\n\nThe Zyber 8S features advanced cooling technology to ensure consistent thermal performance, even during extended operation. Its user-friendly interface makes setup and monitoring straightforward, allowing you to manage mining operations effortlessly.\n\nCompact, energy-efficient, and powerful, the Zyber 8S is your gateway to reliable and profitable Bitcoin mining — all from the comfort of your own space.\n\nHigh-Performance Home Miner - 8 ASIC chips chained, providing up to 6.4+TH/s hash power in OC mode runing at 140W. \nAxeOS - Based UI - Ensuring seamless, familiar operating experience as Bitaxe.\nDual-Phase Power Supply - Ensuring consistent and stable performance under heavy loads.\nCopper-Aluminum Hybrid Cooler with Graphene Coating - Ultra-high thermal conductivity up to 5,000 W/mK delivers 30% faster heat dissipation than traditional materials.\nDual-Fan Cooling System - Cuts temperatures faster with advanced alloy and airflow design. \n6-Layer Reinforced PCB - Minimizes interference and boost signal stability.\n1.9\" ISP Color Display - Real-time monitoring mining activities with ease including temperature, hash rate, and power consumption.', NULL, 1602.99, 801.99, 0, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:13:50', '2026-02-02 11:13:50'),
(24, 2, 'Bitcoin Merch® Bitaxe HEX Lottery Miner 3TH/s', 'bitcoin-merch-bitaxe-hex-lottery-miner-3th-s', 'Introducing the Ultimate All-in-One Lottery Bitcoin Miner with WIFI & OLEDs.\n\n✔️ Mine Bitcoin successfully, GUARANTEED! or your money back\n✔️ Runs over Wifi, and it is silent, perfect for display\n✔️ Consumes less than 🌿80 watts\n✔️ Designed, assembled and shipped from California \n ✔️ 90 Days Warranty - Full Support', NULL, 674.99, 337.99, 0, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:14:53', '2026-02-02 11:14:53'),
(25, 2, 'Bitcoin Merch® Bitaxe Supra + Power Supply Miner 600GH/s', 'bitcoin-merch-bitaxe-supra-power-supply-miner-600gh-s', 'Introducing the Ultimate All-in-One Solo Bitcoin Miner with WIFI & OLEDs.\n\n✔️ Set it up with your phone or PC in minutes!\n✔️ Mine Bitcoin successfully, GUARANTEED! or your money back\n✔️ Runs over Wifi, and it is silent, perfect for display\n✔️ Consumes less than 🌿14 watts, as little as a single LED bulb\n✔️ Designed, assembled and shipped from California \n ✔️ Shipped from California - 30 Days Warranty - Full Support', NULL, 168.99, 84.99, 0, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:16:39', '2026-02-02 11:18:02'),
(26, 2, 'Bitcoin Merch® Bitaxe GT Gamma Turbo (BM1370) ASIC 2TH/s', 'bitcoin-merch-bitaxe-gt-gamma-turbo-bm1370-asic-2th-s', '🚀 Bitaxe Gamma Turbo GT (800x Series)\n🔧 ASIC Chip: 2 Powerful BM1370 ASIC (From Antminer S21 Pro)\n⚡ Hashrate: 2.0 - 2.2 TH/s - Strong Bitcoin Mining Power\n💡 Energy Efficiency: Electricity Consumption Approx. **WJ/TH\n❄️ Aluminum Heatsink and Fan: High Cooling Speed with Special Aluminum Heatsink and Noctua NF-A6x25 Fan\n🏠 Perfect For: The ideal mining rig for high-end professional home and office Bitcoin miners who demand top-tier performance and energy efficiency.\n\n💪 Maximum Hash Power with 2x BM1370 ASIC Chips\nThe Bitaxe Turbo GT utilizes 2 BM1370 ASIC chips to deliver an enhanced hash rate and reduced power consumption. This compact design is perfect for solo mining at home or in the office, although it\'s not recommended for pool mining.', NULL, 548.99, 253.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:21:19', '2026-02-02 11:21:19'),
(27, 2, 'Bitcoin Merch® - Zyber 8G 10+TH/s High Performance Home Bitcoin Miner', 'bitcoin-merch-zyber-8g-10-th-s-high-performance-home-bitcoin-miner', 'Unlock next-level mining efficiency with the Zyber 8G, delivering an impressive 10+ TH/s of processing power. Engineered for both newcomers and seasoned miners, this high-performance device is optimized for home use while maintaining industrial-grade reliability.\n\nFollowing the same design of the 8S but eight BM1370 ASIC chainedwith the enhanced cooling design, providing 10+Th/s hash power while maintaining the same operating\ntemperature as the 8S!\n\nThe Zyber 8G features advanced cooling technology to ensure consistent thermal performance, even during extended operation. Its user-friendly interface makes setup and monitoring straightforward, allowing you to manage mining operations effortlessly.\n\nThis model harnesses the same foundational technologies as the Zyber 8S but with an enhanced capacity. The advanced cooling and power regulation continue to ensure stability under higher loads, making it ideal for miners expanding their at home setups. \n\nCompact, energy-efficient, and powerful, the Zyber 8G is your gateway to reliable and profitable Bitcoin mining — all from the comfort of your own space.\n\n🔥 Reliable High-Performance Home Miner \nAxeOS Based UI - Zero learning curve for Bitaxe&Nerdqaxe users\nDual-Phase Power Supply - Ensuring consistent and stable performance under heavy loads.\n6-Layer Reinforced PCB -  Minimizes interference and boost signal stability.\n1.9\" ISP Color Display - Real-time monitoring mining activities with ease including temperature, hash rate, and power consumption.', NULL, 2024.99, 1012.99, 0, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:34:05', '2026-02-02 11:34:05'),
(28, 2, 'Bitcoin Merch® - NerdQaxe++ Hydro 5+TH/s w Power Supply', 'bitcoin-merch-nerdqaxe-hydro-5-th-s-w-power-supply', 'NerdQaxe++ Hydro – Compact, Efficient, and Reliable Processing Power\n\nThe NerdQaxe++ Hydro is designed for users who need stable and energy-efficient performance in a compact form. Whether you\'re setting up for the first time or expanding your existing system, this unit delivers consistent results with minimal power usage.\n\nProduct Features – NerdQaxe++ Hydro\n✔ High-Efficiency Processing\nEngineered for consistent and stable performance, the NerdQaxe+ Hydro mines Bitcoin with ease at 5 TH/s while minimizing energy consumption\n\n✔ Low Power Consumption\nConsumes significantly less power compared to traditional models, making it an ideal choice for long-term operation and reduced electricity costs.\n\n✔ Compact & Space-Saving Design\nIts sleek and compact form factor makes it easy to fit into small spaces, server racks, or custom setups without compromising performance.\n\n✔ Quiet Operation\nDesigned with noise-reduction features to ensure quiet performance—perfect for use in both residential and office environments.\n\n✔ Intelligent Cooling System\nBuilt-in cooling mechanisms maintain optimal operating temperatures and protect internal components, ensuring longevity and stability.\n\n✔ Plug-and-Play Setup\nSimple to install and configure, making it accessible for both new users and experienced operators.\n\n✔ Reliable and Durable\nCrafted from high-quality materials for long-term use, reducing maintenance and downtime.', NULL, 1181.99, 590.99, 15, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:36:06', '2026-02-02 11:36:06'),
(29, 2, 'NerdOCTaxe 9.6TH/s BTC Miner w/ Power Supply', 'nerdoctaxe-9-6th-s-btc-miner-w-power-supply', 'The nerdOCTaxe is a compact, open-source Bitcoin ASIC miner delivering up to 9.6+ TH/s with efficient, at-home performance and full user control.\n\n✔️ Independent Bitcoin transaction & block verification\n✔️ Plug-and-play — fully preassembled and ready to run\n✔️ Umbrel OS with Bitcoin Core preinstalled\n✔️ 2TB storage for the full blockchain\n✔️ Strengthens Bitcoin decentralization & privacy', NULL, 1855.99, 927.99, 0, NULL, NULL, NULL, 0, 1, NULL, NULL, 0, 0, '2026-02-02 11:39:14', '2026-02-02 11:39:50');

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
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `alt_text`, `is_primary`, `display_order`, `created_at`) VALUES
(71, 2, '/uploads/1768232145537-1.webp', NULL, 1, 1, '2026-01-26 12:33:56'),
(72, 2, '/uploads/1768232150110-2.webp', NULL, 0, 2, '2026-01-26 12:33:56'),
(73, 2, '/uploads/1768232152876-3.webp', NULL, 0, 3, '2026-01-26 12:33:56'),
(74, 2, '/uploads/1768232155368-4.webp', NULL, 0, 4, '2026-01-26 12:33:56'),
(75, 2, '/uploads/1768232157777-5.webp', NULL, 0, 5, '2026-01-26 12:33:56'),
(76, 2, '/uploads/1768232162987-6.webp', NULL, 0, 6, '2026-01-26 12:33:56'),
(98, 3, '/uploads/1769679933914-1.webp', NULL, 1, 1, '2026-01-29 09:50:29'),
(99, 3, '/uploads/1769679938763-2.webp', NULL, 0, 2, '2026-01-29 09:50:29'),
(100, 3, '/uploads/1769679942272-3.webp', NULL, 0, 3, '2026-01-29 09:50:29'),
(101, 3, '/uploads/1769679945800-4.webp', NULL, 0, 4, '2026-01-29 09:50:29'),
(102, 3, '/uploads/1769679948106-5.webp', NULL, 0, 5, '2026-01-29 09:50:29'),
(103, 3, '/uploads/1769679953623-6.webp', NULL, 0, 6, '2026-01-29 09:50:29'),
(104, 3, '/uploads/1769679956110-7.webp', NULL, 0, 7, '2026-01-29 09:50:29'),
(115, 4, '/uploads/1769680713852-1.webp', NULL, 1, 1, '2026-01-29 09:59:16'),
(116, 4, '/uploads/1769680718952-2.webp', NULL, 0, 2, '2026-01-29 09:59:16'),
(117, 4, '/uploads/1769680721829-3.webp', NULL, 0, 3, '2026-01-29 09:59:16'),
(118, 4, '/uploads/1769680724300-4.webp', NULL, 0, 4, '2026-01-29 09:59:16'),
(119, 4, '/uploads/1769680726515-5.webp', NULL, 0, 5, '2026-01-29 09:59:16'),
(120, 5, '/uploads/1769680983379-1.webp', NULL, 1, 1, '2026-01-29 10:03:22'),
(121, 5, '/uploads/1769680986647-2.webp', NULL, 0, 2, '2026-01-29 10:03:22'),
(122, 5, '/uploads/1769680988856-3.webp', NULL, 0, 3, '2026-01-29 10:03:22'),
(123, 5, '/uploads/1769680990986-4.webp', NULL, 0, 4, '2026-01-29 10:03:22'),
(124, 5, '/uploads/1769680999082-5.jpg', NULL, 0, 5, '2026-01-29 10:03:22'),
(125, 6, '/uploads/1769681261752-1.webp', NULL, 1, 1, '2026-01-29 10:08:06'),
(128, 7, '/uploads/1769681766108-1.webp', NULL, 1, 1, '2026-01-29 10:17:28'),
(129, 7, '/uploads/1769681770059-2.webp', NULL, 0, 2, '2026-01-29 10:17:28'),
(130, 8, '/uploads/1769682463273-1.webp', NULL, 1, 1, '2026-01-29 10:27:50'),
(131, 8, '/uploads/1769682466296-2.webp', NULL, 0, 2, '2026-01-29 10:27:50'),
(132, 9, '/uploads/1769682561568-1.webp', NULL, 1, 1, '2026-01-29 10:29:28'),
(133, 9, '/uploads/1769682565321-2.webp', NULL, 0, 2, '2026-01-29 10:29:28'),
(134, 9, '/uploads/1769682567686-3.webp', NULL, 0, 3, '2026-01-29 10:29:28'),
(137, 1, '/uploads/1770027013342-1.jpg', NULL, 1, 1, '2026-02-02 10:11:04'),
(140, 10, '/uploads/1770027439182-1.webp', NULL, 1, 1, '2026-02-02 10:18:03'),
(141, 10, '/uploads/1770027442442-1.jpg', NULL, 0, 2, '2026-02-02 10:18:03'),
(142, 11, '/uploads/1770027587630-1.webp', NULL, 1, 1, '2026-02-02 10:19:57'),
(143, 11, '/uploads/1770027591789-2.webp', NULL, 0, 2, '2026-02-02 10:19:57'),
(144, 11, '/uploads/1770027594197-3.webp', NULL, 0, 3, '2026-02-02 10:19:57'),
(145, 11, '/uploads/1770027596323-4.webp', NULL, 0, 4, '2026-02-02 10:19:57'),
(146, 12, '/uploads/1770027849278-1.webp', NULL, 1, 1, '2026-02-02 10:24:23'),
(147, 12, '/uploads/1770027852293-2.webp', NULL, 0, 2, '2026-02-02 10:24:23'),
(148, 12, '/uploads/1770027856319-3.webp', NULL, 0, 3, '2026-02-02 10:24:23'),
(149, 12, '/uploads/1770027859358-4.webp', NULL, 0, 4, '2026-02-02 10:24:23'),
(150, 12, '/uploads/1770027862086-5.webp', NULL, 0, 5, '2026-02-02 10:24:23'),
(151, 13, '/uploads/1770028147108-1.webp', NULL, 1, 1, '2026-02-02 10:29:09'),
(152, 15, '/uploads/1770029142258-1.webp', NULL, 1, 1, '2026-02-02 10:45:53'),
(153, 15, '/uploads/1770029145081-2.webp', NULL, 0, 2, '2026-02-02 10:45:53'),
(154, 15, '/uploads/1770029147315-3.webp', NULL, 0, 3, '2026-02-02 10:45:53'),
(155, 15, '/uploads/1770029150738-5.webp', NULL, 0, 4, '2026-02-02 10:45:53'),
(156, 16, '/uploads/1770029867448-1.webp', NULL, 1, 1, '2026-02-02 10:57:50'),
(157, 17, '/uploads/1770029986082-1.webp', NULL, 1, 1, '2026-02-02 10:59:53'),
(158, 17, '/uploads/1770029989412-2.webp', NULL, 0, 2, '2026-02-02 10:59:53'),
(159, 17, '/uploads/1770029992099-3.webp', NULL, 0, 3, '2026-02-02 10:59:53'),
(160, 18, '/uploads/1770030204851-1.webp', NULL, 1, 1, '2026-02-02 11:03:29'),
(161, 18, '/uploads/1770030208299-2.webp', NULL, 0, 2, '2026-02-02 11:03:29'),
(162, 19, '/uploads/1770030250360-1.webp', NULL, 1, 1, '2026-02-02 11:05:11'),
(163, 20, '/uploads/1770030469690-1.webp', NULL, 1, 1, '2026-02-02 11:08:19'),
(164, 21, '/uploads/1770030650275-1.webp', NULL, 1, 1, '2026-02-02 11:11:22'),
(165, 22, '/uploads/1770030747189-1.webp', NULL, 1, 1, '2026-02-02 11:12:28'),
(166, 23, '/uploads/1770030817500-1.webp', NULL, 1, 1, '2026-02-02 11:13:50'),
(167, 24, '/uploads/1770030888781-1.webp', NULL, 1, 1, '2026-02-02 11:14:53'),
(168, 24, '/uploads/1770030892016-2.webp', NULL, 0, 2, '2026-02-02 11:14:53'),
(172, 25, '/uploads/1770030992467-1.webp', NULL, 1, 1, '2026-02-02 11:18:02'),
(173, 25, '/uploads/1770030996049-2.webp', NULL, 0, 2, '2026-02-02 11:18:02'),
(174, 25, '/uploads/1770030998371-4.webp', NULL, 0, 3, '2026-02-02 11:18:02'),
(175, 26, '/uploads/1770031272118-1.webp', NULL, 1, 1, '2026-02-02 11:21:19'),
(176, 26, '/uploads/1770031275161-2.webp', NULL, 0, 2, '2026-02-02 11:21:19'),
(177, 27, '/uploads/1770031985670-1.webp', NULL, 1, 1, '2026-02-02 11:34:05'),
(178, 27, '/uploads/1770031989347-2.webp', NULL, 0, 2, '2026-02-02 11:34:05'),
(179, 27, '/uploads/1770031997138-4.webp', NULL, 0, 3, '2026-02-02 11:34:05'),
(180, 28, '/uploads/1770032163349-1.webp', NULL, 1, 1, '2026-02-02 11:36:06'),
(181, 28, '/uploads/1770032166062-2.webp', NULL, 0, 2, '2026-02-02 11:36:06'),
(183, 29, '/uploads/1770032349816-1.webp', NULL, 1, 1, '2026-02-02 11:39:50');

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
`order_date` date
,`orders_count` bigint
,`total_revenue` decimal(32,2)
,`avg_order_value` decimal(14,6)
,`delivered_count` decimal(23,0)
,`pending_count` decimal(23,0)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `v_products_stats`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `v_products_stats`;
CREATE TABLE IF NOT EXISTS `v_products_stats` (
`id` int
,`name` varchar(255)
,`slug` varchar(255)
,`category_name` varchar(100)
,`price` decimal(10,2)
,`discount_price` decimal(10,2)
,`stock` int
,`is_active` tinyint(1)
,`views_count` int
,`sales_count` int
,`reviews_count` bigint
,`avg_rating` decimal(7,4)
,`images_count` bigint
,`created_at` timestamp
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
