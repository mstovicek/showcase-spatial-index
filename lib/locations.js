var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'mysql_spatial',
    port     : '3306',
    user     : 'root',
    password : 'pass',
    database : 'spatial'
});

connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected.");
    } else {
        console.err("Error connecting database:");
        console.err(err);
    }
});

exports.getNearest = function(lat, lon, distance, callback) {
    process.nextTick(function() {
    	var query = `SELECT 
            latitude,
            longitude,
            description,
            ST_Distance_Sphere(
                ST_GeomFromText(?, 0), /* point */
                geom
            ) / 1000 as distance_km
            FROM ?? /* table */
            WHERE ST_Contains(
                ST_MakeEnvelope(
                    ST_GeomFromText(?, 0), /* point + dist */
                    ST_GeomFromText(?, 0) /* point - dist */
                ), 
                geom 
            )
            AND ST_Distance_Sphere(
                ST_GeomFromText(?, 0), /* point */
                geom
            ) / 1000 < ?
            ORDER BY distance_km ASC`; /* distance */

        queryParams = [
            'POINT(' + (lat) + ' ' + (lon) + ')',
            'locations_all',
            'POINT(' + (lat + (distance / 111)) + ' ' + (lon + (distance / 111)) + ')',
            'POINT(' + (lat - (distance / 111)) + ' ' + (lon - (distance / 111)) + ')',
            'POINT(' + (lat) + ' ' + (lon) + ')',
            distance
        ];

        connection.query(query, queryParams, function(err, rows, fields) {
            if (!err) {
                callback(null, rows);
            } else {
                callback(err, null);
            }
        });
    });
};
