## Start

```
$ docker-compose up -d
$ npm install
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
