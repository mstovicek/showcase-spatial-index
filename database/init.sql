CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `geom` geometry DEFAULT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `description` varchar(127) DEFAULT '' NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- source /usr/src/app/database/data-mini.sql
-- source /usr/src/app/database/data-de.sql

UPDATE locations SET geom = ST_GeomFromText(CONCAT('POINT(', latitude, ' ', longitude,')'), 0);

ALTER TABLE `locations` CHANGE `geom` `geom` GEOMETRY NOT NULL;

ALTER TABLE locations ADD SPATIAL INDEX(geom);
