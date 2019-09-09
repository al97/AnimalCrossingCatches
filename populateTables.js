var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({/* no peeking! */
});

var app = express();
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "LOAD DATA LOCAL INFILE 'fish.csv' INTO TABLE fish FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var bugs = "LOAD DATA LOCAL INFILE 'bugs.csv' INTO TABLE bugs FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n'";
    connection.query(bugs, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var dsc = "LOAD DATA LOCAL INFILE 'deepSeaCreatures.csv' INTO TABLE deepSeaCreatures FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n'";
    connection.query(dsc, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

});
