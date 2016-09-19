var express    = require('express'),
    locations  = require('./lib/locations'),
    app = express();

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/**
 * http://docker.dev:3000/closest/lat/lon/dist
 */
app.get('/closest/:lat/:lon/:distance?', function(req, res) {
    var lat = parseFloat(req.params.lat);
    var lon = parseFloat(req.params.lon);
    var distance = parseInt(req.params.distance) || 20;

    locations.getNearest(lat, lon, distance, function(err, result) {

        if (err) {
            return res.status(500).json({ success: false, reason: err });
        }

        res.setHeader('Content-Type', 'application/json');
        res.send({ success: true, locations: result });
    });
});

app.listen(3000);
