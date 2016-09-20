## Objection

Assume you have a list of 100k addresses with geo coordinates. Design a system with a function that will:

- filter out items that are more than Xkm away from geo point sent as function parameter
- sort items left after filtering from nearest to farthest
- your system should be efficient in terms of cpu, memory, I/O usage


## Start

```
$ npm install
$ docker-compose up -d
$ docker exec -i -t mysql_spatial mysql -uroot -ppass -e 'CREATE DATABASE `spatial` DEFAULT CHARACTER SET = `utf8`;'
$ # uncomment data source in ./database/init.sql
$ docker exec -i -t mysql_spatial mysql -uroot -ppass -e 'USE `spatial`; SOURCE /usr/src/app/database/init.sql;'
$ docker-compose restart node
$ npm run http-server
```


## Usage - front-end

URL format for Front-end: `http://127.0.0.1:8080/?lat=52.516248&lon=13.377709&dist=5`

- `lat` - latitude of center point
- `lon` - longitude of center point
- `dist` - radius of the search area around the center point, optinal (default 20km)


## Usage - API

URL of API endpoint: `http://docker.dev:3000/closest/:lat/:long/:dist`

- `:lat` - latitude of center point
- `:lon` - longitude of center point
- `:dist` - radius of the search area around the center point, optinal (default 20km)
