#
# SQL Export
# Created by Querious (201067)
# Created: 3 October BE 2562 11:38:53 GMT+7
# Encoding: Unicode (UTF-8)
#


DROP DATABASE IF EXISTS `chattest`;
CREATE DATABASE `chattest` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE `chattest`;




SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `chat_room`;
DROP TABLE IF EXISTS `room`;
DROP TABLE IF EXISTS `chat`;


CREATE TABLE `chat` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `sendID` int(8) NOT NULL,
  `send_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sendID` (`sendID`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`sendID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;


CREATE TABLE `room` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;


CREATE TABLE `chat_room` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `massage_id` int(8) NOT NULL,
  `room_id` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `massage_id` (`massage_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`massage_id`) REFERENCES `chat` (`id`),
  CONSTRAINT `chat_room_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;


CREATE TABLE `user` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


LOCK TABLES `chat` WRITE;
ALTER TABLE `chat` DISABLE KEYS;
INSERT INTO `chat` (`id`, `message`, `sendID`, `send_at`) VALUES 
	(24,'r1',2,'2019-10-03 11:13:06'),
	(25,'r2',1,'2019-10-03 11:13:09'),
	(26,'r11',1,'2019-10-03 11:13:26'),
	(27,'r22',2,'2019-10-03 11:13:32'),
	(28,'r222',1,'2019-10-03 11:13:43'),
	(29,'r111',1,'2019-10-03 11:13:57'),
	(30,'r2222',1,'2019-10-03 11:16:00'),
	(31,'r22222',1,'2019-10-03 11:16:13');
ALTER TABLE `chat` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `room` WRITE;
ALTER TABLE `room` DISABLE KEYS;
INSERT INTO `room` (`id`, `name`, `create_at`) VALUES 
	(9,'room1','2019-10-03 10:21:43'),
	(11,'room2','2019-10-03 10:31:28');
ALTER TABLE `room` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `chat_room` WRITE;
ALTER TABLE `chat_room` DISABLE KEYS;
INSERT INTO `chat_room` (`id`, `massage_id`, `room_id`) VALUES 
	(22,24,9),
	(23,25,11),
	(24,26,9),
	(25,27,11),
	(26,28,11),
	(27,29,9),
	(28,30,11),
	(29,31,11);
ALTER TABLE `chat_room` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `user` WRITE;
ALTER TABLE `user` DISABLE KEYS;
INSERT INTO `user` (`id`, `name`, `username`, `password`) VALUES 
	(1,'test','test','test'),
	(2,'test2','test2','test2');
ALTER TABLE `user` ENABLE KEYS;
UNLOCK TABLES;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


