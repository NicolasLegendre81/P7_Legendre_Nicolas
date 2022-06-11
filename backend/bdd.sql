/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `groupomaniacs` /*!40100 DEFAULT CHARACTER SET utf16 */;
USE `groupomaniacs`;

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(500) DEFAULT NULL,
  `post_id` int(11) NOT NULL,
  `comment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_Author_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf16;

/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `posts` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `post` varchar(500) DEFAULT NULL,
  `post_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int(11) NOT NULL,
  `post_imageUrl` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  KEY `user_id` (`author_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf16;

/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL COMMENT 'Nom De Famille de l''utilisateur',
  `prenom` varchar(100) NOT NULL COMMENT 'Prénom de l''utilisateur',
  `email` varchar(250) NOT NULL COMMENT 'Adresse electronique de l''utilisateur',
  `password` longtext NOT NULL COMMENT 'Mot de passe',
  `position_in_company` varchar(100) NOT NULL COMMENT 'Poste occupé par l''utilisateur dans la société',
  `Admin` tinyint(1) DEFAULT '0' COMMENT 'Administateur du Réseau social',
  `imageUrl` varchar(150) NOT NULL DEFAULT 'http://localhost:3000/images/profilePic.jpg',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf16;

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `nom`, `prenom`, `email`, `password`, `position_in_company`, `Admin`, `imageUrl`) VALUES
	(24, 'Administrateur', 'GroupoAdmin', 'groupoadmin@gmail.com', '$2b$10$Uk/5bFFCzKyFdtV/9SvjQ.Esn53aJzWj1z6G79K6LUzfbnrq/vj2C', 'Adminsitrateur du réseau social', 1, 'http://localhost:3000/images/profilePic.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
