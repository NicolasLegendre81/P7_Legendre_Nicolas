-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.28 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour groupomaniacs
CREATE DATABASE IF NOT EXISTS `groupomaniacs` /*!40100 DEFAULT CHARACTER SET utf16 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomaniacs`;

-- Listage de la structure de la table groupomaniacs. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id_post` int NOT NULL AUTO_INCREMENT,
  `post` varchar(500) CHARACTER SET utf16 COLLATE utf16_general_ci DEFAULT NULL,
  `post_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int NOT NULL,
  `post_imageUrl` varchar(300) CHARACTER SET utf16 COLLATE utf16_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  KEY `user_id` (`author_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf16;

-- Listage des données de la table groupomaniacs.posts : ~6 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
REPLACE INTO `posts` (`id_post`, `post`, `post_date`, `author_id`, `post_imageUrl`) VALUES
	(1, ' Test 6', '2022-02-07 09:51:16', 17, NULL),
	(2, ' Test', '2022-02-07 09:53:38', 20, NULL),
	(3, ' Tout va bien dans le meilleur des mondes', '2022-02-07 15:57:33', 20, ''),
	(4, ' Test 6', '2022-02-09 08:07:57', 20, ''),
	(5, ' Test 999', '2022-02-10 11:44:23', 22, ''),
	(8, 'enfin j\'ai compris', '2022-02-12 08:04:41', 23, 'http://localhost:3000/images/m_a_l_e_-_a_v_a_t_a_r_._j_p_g1644649850521.jpg'),
	(10, 'Hey bro comment vas tu?', '2022-02-16 06:58:54', 23, ''),
	(11, 'Quelle prise de tête!!', '2022-02-16 06:59:32', 23, '');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table groupomaniacs. users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL COMMENT 'Nom De Famille de l''utilisateur',
  `prenom` varchar(100) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL COMMENT 'Prénom de l''utilisateur',
  `email` varchar(250) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL COMMENT 'Adresse electronique de l''utilisateur',
  `password` longtext CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL COMMENT 'Mot de passe',
  `position_in_company` varchar(100) NOT NULL COMMENT 'Poste occupé par l''utilisateur dans la société',
  `Admin` tinyint(1) DEFAULT '0' COMMENT 'Administateur du Réseau social',
  `imageUrl` varchar(150) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL DEFAULT 'http://localhost:3000/images/profilePic.jpg',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf16;

-- Listage des données de la table groupomaniacs.users : ~6 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`user_id`, `nom`, `prenom`, `email`, `password`, `position_in_company`, `Admin`, `imageUrl`) VALUES
	(7, 'Legendre', 'ophélie', 'legendre81.nlk@gmail.com', '$2b$10$huVn2wa5tbbGTNiQkITBXOoIBQT0ck32Mu390/iE4u/HuStxq2byO', 'pdg', 0, 'NULL'),
	(16, 'Legendre', 'nicolas', 'legendre81.nl@gmail.com', '$2b$10$r6luiBSUMvjVM2DNMKK1hOzzItXwj10W3eN1LHsl4Bw4MvhNXN2GS', 'pdg', 0, 'http://localhost:3000/image/profilePic.jpg'),
	(17, 'Legendre', 'Maurice', 'legendre81@gmail.com', '$2b$10$1jPCQ0KTVdFAffN4B.pbHO5wS/6TPiajxZTbrbvgJ2O5ZUdtF5lvS', 'aucune', 0, 'http://localhost:3000/images/profilePic.jpg'),
	(21, 'AUTIN', 'Maurice', 'legendre81.@gmail.com', '$2b$10$ojTShQ0CYOMnlKu03Q63s.qcT7Z5bkSBT5OSDVKypu5ScqeVQJ/Di', 'aucune', 0, 'http://localhost:3000/images/m_a_l_e_-_a_v_a_t_a_r_._j_p_g1644403832212.jpg'),
	(22, 'Lamber', 'Josette', 'jtmsweet@virgilio.it', '$2b$10$p4xJyy4iQMCQC4.6nv7XHOyDNhaodNgxPBYok5ZawsbbsFX65A9ha', 'Assistante de direction', 0, 'http://localhost:3000/images/m_a_l_e_-_a_v_a_t_a_r_._j_p_g1644415383311.jpg'),
	(23, 'LambRai', 'Louis', 'lambrai.louis@gmail.com', '$2b$10$DtGjvrmFi.RI9DRprjdpteyxdAZ0XltZSYtc023azpGpxkG361.6q', 'Technicien informatique', 0, 'http://localhost:3000/images/profilePic.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
