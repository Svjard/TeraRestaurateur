TeraRestaurateur
================

An awesome multiplayer, browser-based game with social elements used to showcase the power of data analytics on Teradata and IMM

Compatible OS/Browsers:
* Linux/Chrome
* Linux/Firefox
* iOS/Safari
* iOS/Chrome
* Android/Chrome

## Dependencies

Be sure to run `npm install && bower install` to fetch the latest dependencies.
Afterwards, be sure to build sockjs-client per [the instructions](https://github.com/sockjs/sockjs-client#development-and-testing).

```shell
cd public/vendor/sockjs-client
echo "echo \\" | cat - version > VERSION-GEN
npm install
npm install --dev
make sockjs.js
```

The application requires MongoDB 2.4.8 to be installed and running with a database called `terarestaurantuer`.

This application was built using node 0.10.21.

## Use

Start the server with `node index.js`.
Direct a browser on the same machine to [http://0.0.0.0:3000/](http://0.0.0.0:3000/).