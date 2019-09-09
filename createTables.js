var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({/* no peeking! */
});

var app = express();
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE fish (name VARCHAR(255), price INT, location VARCHAR(255), ShadowSize VARCHAR(255), time VARCHAR(255), january VARCHAR(5), february VARCHAR(5), march VARCHAR(5), april VARCHAR(5), may VARCHAR(5), june VARCHAR(5), july VARCHAR(5), august VARCHAR(5), september VARCHAR(5), october VARCHAR(5), november VARCHAR(5), december VARCHAR(5), startTime INT(4), endTime INT(4), CONSTRAINT fishPK PRIMARY KEY (name)) ";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var bugs = "CREATE TABLE bugs (name VARCHAR(255), price INT, location VARCHAR(255), time VARCHAR(255), january VARCHAR(5), february VARCHAR(5), march VARCHAR(5), april VARCHAR(5), may VARCHAR(5), june VARCHAR(5), july VARCHAR(5), august VARCHAR(5), september VARCHAR(5), october VARCHAR(5), november VARCHAR(5), december VARCHAR(5), startTime INT(4), endTime INT(4), CONSTRAINT bugPK PRIMARY KEY (name))";
    connection.query(bugs, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var dsc = "CREATE TABLE deepSeaCreatures (name VARCHAR(255), price INT NOT NULL, ShadowSize VARCHAR(255), time VARCHAR(255), january VARCHAR(5), february VARCHAR(5), march VARCHAR(5), april VARCHAR(5), may VARCHAR(5), june VARCHAR(5), july VARCHAR(5), august VARCHAR(5), september VARCHAR(5), october VARCHAR(5), november VARCHAR(5), december VARCHAR(5), startTime INT(4), endTime INT(4), CONSTRAINT dscPK PRIMARY KEY (name))";
    connection.query(dsc, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
