var express = require("express");
var mysql = require('mysql');

var connection = mysql.createConnection({/* no peeking! */
});

var app = express();
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "select * from fish, bugs, deepSeaCreatures where ";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log(result[1]);
    });

});
