var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({/* no peeking! */
});

var app = express();
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "drop table fish";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    var bugs = "drop table bugs";
    connection.query(bugs, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    var dsc = "drop table deepSeaCreatures";
    connection.query(dsc, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});
