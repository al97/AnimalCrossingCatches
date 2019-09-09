var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({/* no peeking! */
});

var app = express();
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
})
connection.end();
