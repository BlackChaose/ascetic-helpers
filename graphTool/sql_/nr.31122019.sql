-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:
-- Server OS:                    Linux
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table nr.timelog
CREATE TABLE IF NOT EXISTS `timelog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=latin1;

-- Dumping data for table nr.timelog: ~29 rows (approximately)
/*!40000 ALTER TABLE `timelog` DISABLE KEYS */;
INSERT INTO `timelog` (`id`, `date`, `message`) VALUES
	(1, '2019-11-15 09:11:51', 'nik-pc was rebooted or started'),
	(170, '2019-11-15 09:11:51', 'nik-pc was rebooted or started'),
	(171, '2019-11-19 08:33:06', 'nik-pc was rebooted or started'),
	(172, '2019-11-20 08:24:08', 'nik-pc was rebooted or started'),
	(173, '2019-11-21 08:36:55', 'nik-pc was rebooted or started'),
	(174, '2019-11-22 09:05:24', 'nik-pc was rebooted or started'),
	(175, '2019-11-25 09:46:48', 'nik-pc was rebooted or started'),
	(176, '2019-11-26 09:08:03', 'nik-pc was rebooted or started'),
	(177, '2019-11-27 08:40:22', 'nik-pc was rebooted or started'),
	(178, '2019-11-28 09:33:59', 'nik-pc was rebooted or started'),
	(179, '2019-11-29 09:06:48', 'nik-pc was rebooted or started'),
	(180, '2019-12-02 09:46:29', 'nik-pc was rebooted or started'),
	(181, '2019-12-03 10:28:54', 'nik-pc was rebooted or started'),
	(182, '2019-12-05 09:09:08', 'nik-pc was rebooted or started'),
	(183, '2019-12-06 09:40:34', 'nik-pc was rebooted or started'),
	(184, '2019-12-09 09:59:59', 'nik-pc was rebooted or started'),
	(185, '2019-12-10 09:45:02', 'nik-pc was rebooted or started'),
	(186, '2019-12-11 14:04:40', 'nik-pc was rebooted or started'),
	(187, '2019-12-12 09:17:25', 'nik-pc was rebooted or started'),
	(188, '2019-12-13 09:32:47', 'nik-pc was rebooted or started'),
	(189, '2019-12-16 09:46:00', 'nik-pc was rebooted or started'),
	(190, '2019-12-17 09:36:37', 'nik-pc was rebooted or started'),
	(191, '2019-12-18 08:51:40', 'nik-pc was rebooted or started'),
	(192, '2019-12-19 09:34:22', 'nik-pc was rebooted or started'),
	(193, '2019-12-20 09:31:53', 'nik-pc was rebooted or started'),
	(194, '2019-12-23 09:33:46', 'nik-pc was rebooted or started'),
	(195, '2019-12-24 09:30:16', 'nik-pc was rebooted or started'),
	(196, '2019-12-25 09:55:04', 'nik-pc was rebooted or started'),
	(198, '2019-12-26 09:13:19', 'nik-pc was rebooted or started');
/*!40000 ALTER TABLE `timelog` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
