var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var mysql = require('mysql');


var d = new Date();
var month;
switch (d.getMonth()) {
    case 0:
        month = "january";
        break;
    case 1:
        month = "february";
        break;
    case 2:
        month = "march";
        break;
    case 3:
        month = "april";
        break;
    case 4:
        month = "may";
        break;
    case 5:
        month = "june";
        break;
    case 6:
        month = "july";
        break;
    case 7:
        month = "august";
        break;
    case 8:
        month = "september";
        break;
    case 9:
        month = "october";
        break;
    case 10:
        month = "november";
        break;
    case 11:
        month = "december";
        break;
}


var connection = mysql.createConnection({/* no peeking! */
});

var fishRows;
var bugRows;
var dscRows;

function setFishValue(value) {
    fishRows = value;
}

function setBugsValue(value) {
    bugRows = value;
}

function setDscValue(value) {
    dscRows = value;
}

var hourInBetween = "and (startTime <= " + d.getHours() + " and endTime > " + d.getHours() + ")";
var hourStartGreaterThanEnd = " or (startTime > endTime and ((startTime <= " + d.getHours() + " and endTime < " + d.getHours() + ") or (startTime >= " + d.getHours() + " and endTime > " + d.getHours() + ")))";

var app = express();
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "select * from fish where " + month + " = 'YES' " + hourInBetween + hourStartGreaterThanEnd;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        setFishValue(result);
        
    });

    var bugs = "select * from bugs where " + month + " = 'YES' " + hourInBetween + hourStartGreaterThanEnd;
    connection.query(bugs, function (err, result) {
        if (err) throw err;
        setBugsValue(result);
        
    });

    var dscR = "select * from deepSeaCreatures where " + month + " = 'YES' " + hourInBetween + hourStartGreaterThanEnd;
    connection.query(dscR, function (err, result) {
        if (err) throw err;
        setDscValue(result);
        
    });

    
});
var d = new Date();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index', { fishrows: fishRows, bugrows: bugRows, dscrows: dscRows, time: d });
});


module.exports = app;
