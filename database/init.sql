CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `geom` geometry DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NOT NULL,
  `longitude` decimal(11,8) DEFAULT NOT NULL,
  `description` varchar(127) DEFAULT NOT NULL,
  PRIMARY KEY (`id`),
  SPATIAL KEY `geom` (`geom`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- source ./data-mini.sql
-- source ./data-de.sql

UPDATE locations SET geom = ST_GeomFromText(CONCAT('POINT(', latitude, ' ', longitude,')'), 0);

ALTER TABLE `locations` CHANGE `geom` `geom` GEOMETRY NOT NULL;

ALTER TABLE locations ADD SPATIAL INDEX(geom);
