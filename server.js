var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var server  = http.createServer(app).listen(3000);

//var chatMessage;
var chatMessages = [];
var responseArray =[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.sendFile(__dirname + '/index.html');
});

app.get('/subscribe', function (req, res) {
    responseArray.push(res);
});

app.post('/publish', function(req, res){
    //chatMessage = req.body;
    chatMessages.push(req.body);
    //chatMessages=[];
    res.send('сообщение отправленно');
});

app.get('*', function(req, res){
    res.send('Ошибка 404', 404);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Ошибка 500',500);
});

var sendDelay = setInterval(function(){
    if(chatMessages.length>0){
        responseArray.forEach(function(r){
            console.log(chatMessages);
            r.send(JSON.stringify(chatMessages));
            //r.send(chatMessages);
        });
        responseArray=[];
        chatMessages=[];
    }
},100);


