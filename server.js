var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var port = process.env.PORT || 80;
var router = express.Router();

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'Build')));

app.use(function (req, res, next) {
    console.log(`${req.method}: ${req.url}`)
    next();
});
// //CORS middleware
// var allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }
// app.use(allowCrossDomain);

var appRouter = express.Router();
// var apiRouter = express.Routers();
// apiSql(apiRouter);


var loginUsers = {}

appRouter.get('/login', function (req, res) {
    
    res.sendFile(__dirname + '/Build/index.html');
});

appRouter.get('*', function (req, res) {
    res.sendFile(__dirname + '/Build/index.html');
});


// appRouter.get('/:item', function (req, res) {
//     res.sendFile(__dirname + '/Build/index.html');
// });

// appRouter.get('/:item/:page', function (req, res) {
//     res.sendFile(__dirname + '/Build/index.html');
// });

app.use('/', appRouter);
// app.use('/api', apiRouter);

// app.get('*', function (req, res) {
//     res.json({ 'route': 'Sorry this page does not exist!' });
// });


app.listen(port);

console.log('...running at https://localhost:' + port);