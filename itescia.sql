-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jun 08, 2021 at 08:50 AM
-- Server version: 10.5.4-MariaDB
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itescia`
--

-- --------------------------------------------------------

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
CREATE TABLE IF NOT EXISTS `campus` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `localisation` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `campus`
--

INSERT INTO `campus` (`id`, `nom`, `localisation`) VALUES
(0, 'null', 'null Island');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `nom`, `dateDebut`, `dateFin`, `description`) VALUES
(1, 'event en mousse', '2021-06-01', '2021-06-09', 'nope'),
(2, 'event en mousse', '2021-06-01', '2021-06-09', 'nope'),
(3, 'event en mousse', '2021-06-01', '2021-06-09', 'nope'),
(4, 'event en mousse', '2021-06-01', '2021-06-09', 'nope'),
(5, 'event en mousse', '2021-06-01', '2021-06-09', 'nope'),
(6, 'event en mousse', '2021-06-01', '2021-06-09', 'nope'),
(7, 'event en mousse', '2021-06-01', '2021-06-09', 'nope'),
(8, 'event en papier', '2021-06-01', '2021-06-09', 'nope');

-- --------------------------------------------------------

--
-- Table structure for table `flyers`
--

DROP TABLE IF EXISTS `flyers`;
CREATE TABLE IF NOT EXISTS `flyers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` int(11) NOT NULL,
  `flyer` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `formations`
--

DROP TABLE IF EXISTS `formations`;
CREATE TABLE IF NOT EXISTS `formations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `representant` varchar(50) NOT NULL,
  `idCampus` int(11) NOT NULL,
  `forms` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_campus` (`idCampus`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formations`
--

INSERT INTO `formations` (`id`, `nom`, `representant`, `idCampus`, `forms`) VALUES
(2, 'Licence Informatique Générale', 'M. Tarte Auxpommes', 0, ''),
(3, 'Tructruc', 'Tarte Tatin', 0, ''),
(6, 'Chose', 'Chausson Auxpommes', 0, ''),
(7, 'Chose', 'Chausson Auxpommes', 0, ''),
(19, 'BTS ILS', 'M. Tarte Auxpommes', 0, 'null');

-- --------------------------------------------------------

--
-- Table structure for table `lienflyerstand`
--

DROP TABLE IF EXISTS `lienflyerstand`;
CREATE TABLE IF NOT EXISTS `lienflyerstand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idStand` int(11) NOT NULL,
  `idFlyer` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stand_flyer` (`idStand`),
  KEY `fk_flyer_stand` (`idFlyer`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lienformationstand`
--

DROP TABLE IF EXISTS `lienformationstand`;
CREATE TABLE IF NOT EXISTS `lienformationstand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idFormation` int(11) NOT NULL,
  `idStand` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_formation_stand` (`idFormation`),
  KEY `fk_stand_formation` (`idStand`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_client`
--

DROP TABLE IF EXISTS `oauth_client`;
CREATE TABLE IF NOT EXISTS `oauth_client` (
  `client_id` text NOT NULL,
  `client_secret` text NOT NULL,
  `redirect_uri` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oauth_client`
--

INSERT INTO `oauth_client` (`client_id`, `client_secret`, `redirect_uri`) VALUES
('null', 'null', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_tokens`
--

DROP TABLE IF EXISTS `oauth_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_token` text NOT NULL,
  `access_token_expires_on` datetime DEFAULT NULL,
  `client_id` text NOT NULL,
  `refresh_token` text NOT NULL,
  `refresh_token_expires_on` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oauth_tokens`
--

INSERT INTO `oauth_tokens` (`id`, `access_token`, `access_token_expires_on`, `client_id`, `refresh_token`, `refresh_token_expires_on`, `user_id`) VALUES
(4, '73a344e4701a3bc89f12c5ed6b4d34a2f6f7aef3', '2021-05-13 00:54:27', 'application', '86dce5e3dc633de15adf121c76dc343f433c9844', '2021-05-26 23:54:27', 1),
(5, '0c83fc707f3739eb7d8459f64e1368bb15b89eeb', '2021-05-13 00:55:24', 'application', '561fe0a8e6c36a8029fe5f4198cad48aeac68e1f', '2021-05-26 23:55:24', 1),
(6, 'a1b424db96f817f2e7484715f9a1ace0a423dc2e', '2021-05-13 01:07:15', 'application', '95eca550dd08803c81095d90a45f6f8c90d6f96f', '2021-05-27 00:07:15', 1),
(7, 'd80d13224a0a93cf1a2f9395b23789c19ef0e4a1', '2021-05-13 01:07:28', 'application', '77949e61618d098a7e5f2043570548a63a70c696', '2021-05-27 00:07:28', 1),
(8, '075661c247e02ed5b08ff4432decd038556ff1a3', '2021-05-13 01:07:57', 'application', '5ab39caf55b6abc61115c6764721f3b98e130847', '2021-05-27 00:07:57', 1),
(9, 'd93bc4e5c86f914ed1f1c409d72999cf7781b04d', '2021-05-13 01:08:12', 'application', '22e70c2d7fa2bf671fde7738967d7e3c6bb42838', '2021-05-27 00:08:12', 1),
(10, '8293d631ffd90acd6f51f9c63dee380d1a2b16df', '2021-05-13 01:08:22', 'application', '1535a30ad7bd2bd4a2aad7ccbb5e3be8552af2e4', '2021-05-27 00:08:22', 1),
(11, '992196e18f827a917031593c1ecc58f0cda1bb5a', '2021-05-13 01:23:18', 'application', '45843bb1a3204e78f25bdf2f2c1961a6995f68d8', '2021-05-27 00:23:18', 1),
(12, '7ab76df52e3b50b6788829d0baaf278235ed616f', '2021-05-13 01:23:31', 'application', 'c31382761a5aa5a9a3e158610bad64ea0a76d0df', '2021-05-27 00:23:31', 1),
(13, 'f009278b6e157d7a2440dc4f8c156af3fb493394', '2021-05-13 02:09:41', 'application', '68c372a0ee50849fe9d7ed398c504a53ee5723af', '2021-05-27 01:09:41', 1),
(14, 'f8fcd751d45c4f5d229c3c1cf1e02d32c6be3b0a', '2021-05-13 02:11:44', 'application', '66a7c43f2aeabb785267fccf2cebfa4d9be731b1', '2021-05-27 01:11:44', 1),
(15, '187347c1a58e80a4f6b2e93d573370f717679ece', '2021-05-13 02:12:07', 'application', '89263c2d5d7871d0b112b9507bea5acc5bb77e8c', '2021-05-27 01:12:07', 1),
(16, '3875f496b7b29ca11e6b91040e544ad6963d38b9', '2021-05-13 02:12:22', 'application', 'b997f5a72c228f7cfe17685e0c992e6b4fd47c34', '2021-05-27 01:12:22', 1),
(17, 'ae9b221fe38c2a8a831f6ba7a4d878c2b1e1ed78', '2021-05-13 02:31:29', 'application', '11ce9a9328d189d9f5f65bd1d939df7c9e76932d', '2021-05-27 01:31:29', 1),
(18, '43f0e09a3a795800c28de8e148477894c90d087f', '2021-05-24 15:43:59', 'application', '334bc5aeb87ba67d4ff24b5ffdb27fe49be78922', '2021-06-07 14:43:59', 1),
(19, 'ad4990fbb1fbc6961b77b38044ef8b1dec29c634', '2021-05-25 12:15:36', 'null', 'b72693afdc36c07c9ad193e43c3771e78869b9e0', '2021-06-08 11:15:36', 1),
(20, '898c6014d2273a6a22d93bf9ca7a0ba6e4b9dbca', '2021-05-30 15:20:55', 'null', 'bbb336135fced5fb7a833a519e640d13e2bac196', '2021-06-13 14:20:55', 1),
(21, '0e39943481cd018a9072f7b2de5f70c606d3765c', '2021-05-30 15:26:54', 'application', 'c6a74785a5c6c5e30bb8bb6a54f89e7c8b5aab5d', '2021-06-13 14:26:54', 1),
(22, '7cd65d5cd43283a4443e406f162b5e52fddc9ed3', '2021-05-30 15:27:39', 'application', '39a669f92ee8a944be2248b303cd14e0ebd538dd', '2021-06-13 14:27:39', 1),
(23, '38fedf0d70ebffa1615330e2a0615ca0c51c6257', '2021-06-06 14:21:40', 'null', '298b1249ef1c6537f3258f18dc47d0b4fb1a7b59', '2021-06-20 13:21:40', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stands`
--

DROP TABLE IF EXISTS `stands`;
CREATE TABLE IF NOT EXISTS `stands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meet` varchar(255) NOT NULL,
  `ecran` longblob DEFAULT NULL,
  `ecranType` varchar(30) NOT NULL DEFAULT 'image/png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stands`
--

INSERT INTO `stands` (`id`, `meet`, `ecran`, `ecranType`) VALUES
(17, 'blarg', NULL, 'image/png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'test', 'password');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `fk_campus` FOREIGN KEY (`idCampus`) REFERENCES `campus` (`id`);

--
-- Constraints for table `lienflyerstand`
--
ALTER TABLE `lienflyerstand`
  ADD CONSTRAINT `fk_flyer_stand` FOREIGN KEY (`idFlyer`) REFERENCES `flyers` (`id`),
  ADD CONSTRAINT `fk_stand_flyer` FOREIGN KEY (`idStand`) REFERENCES `stands` (`id`);

--
-- Constraints for table `lienformationstand`
--
ALTER TABLE `lienformationstand`
  ADD CONSTRAINT `fk_formation_stand` FOREIGN KEY (`idFormation`) REFERENCES `formations` (`id`),
  ADD CONSTRAINT `fk_stand_formation` FOREIGN KEY (`idStand`) REFERENCES `stands` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
