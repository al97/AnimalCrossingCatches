var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// for session state management and login
var session = require('express-session');
var bodyParser = require('body-parser');

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



var connection = mysql.createConnection({
    /* no peeking */
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


// login 

function ensureAuthenticated(req, res, next) {
    if (!req.user) {
      return res.status(401).render("unauthenticated");
    }
  
    next();
  }
var app = express();

    

app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(require('connect-flash')());

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get('/logout', function (req, res) {
    req.session.loggedin = false;
    req.session.username = undefined;
    req.flash('msg1', '');
    res.redirect('/home');
})

app.get('/catchToday', function (req, res) {
    res.sendFile(path.join(__dirname + '/yourtime.html'));
    
});

app.post('/catchWithTime', function (req, res) {
    var hour = parseInt(req.body.username);
    var month = parseInt(req.body.password);
    switch (month) {
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
        
    if (req.session.loggedin) {
        var hourInBetween = "and (startTime <= " + hour + " and endTime > " + hour + ")";
        var hourStartGreaterThanEnd = " or (startTime > endTime and ((startTime <= " + hour + " and endTime < " + hour + ") or (startTime >= " + hour + " and endTime > " + hour + ")))";
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
            res.render('indexLoggedIn', {username: req.session.username, fishrows: fishRows, bugrows: bugRows, dscrows: dscRows });
        });
        
    }
    else {
        var hourInBetween = "and (startTime <= " + hour + " and endTime > " + hour + ")";
        var hourStartGreaterThanEnd = " or (startTime > endTime and ((startTime <= " + hour + " and endTime < " + hour + ") or (startTime >= " + hour + " and endTime > " + hour + ")))";
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
            res.render('index', { fishrows: fishRows, bugrows: bugRows, dscrows: dscRows });
        });
        
    }
});


app.get('/login', function(req, res) {
    if (req.session.loggedin) {
        res.redirect('/myCatalog');
    }
    else {
        var me = req.flash('msg1');
        res.render('login', {wrong: me});
    }
});

app.get('/register', function(req, res) {
    if (req.session.loggedin) {
        res.redirect('/myCatalog');
    }
    else {
        var me = req.flash('msg3');
        res.render('register', {wrong: me});
    }
    
});

app.get('/addCatchData', function(req, res) {
    if (req.session.loggedin) {
        var me = req.flash('msg2');
        res.render('addCatchData', {username: req.session.username, wrong: me});
    }
    else {
        res.redirect('/login');
    }
   
});

app.get('/', function(req, res) {
    if (req.session.loggedin) {
        res.render('home', {username: req.session.username});
    }
    else {
        res.sendFile(path.join(__dirname + '/home.html'));
    }
});
app.get('/home', function(req, res) {
    if (req.session.loggedin) {
        res.render('home', {username: req.session.username});
    }
    else {
        res.sendFile(path.join(__dirname + '/home.html'));
    }
});

app.get('/about', function(req, res) {
    if (req.session.loggedin) {
        res.render('about', {username: req.session.username});
    }
    else {
        res.sendFile(path.join(__dirname + '/about.html'));
    }
})

app.post('/addCatch', function(req, res) {
    var name = req.body.name;
    var recordweight = req.body.recordweight;
    var creature = req.body.creature;
    if (name && recordweight && creature) {
        if (creature == "Fish") {
            connection.query('select * from fish where name = "' + name + '"', function(err, result, fields) {
                if (result.length < 1) {
                    req.flash('msg2', "Are you sure that's a fish in the game?");
                    res.redirect('addCatchData');
                }
                else {
                    connection.query('select * from catalogFish where creature = "' + name + '"', function(err, result1, fields) {
                        if (result1.length > 0) {
                            req.flash('msg2', "Dude, you have this fish!");
                            res.redirect('addCatchData');
                        }
                        else {
                            connection.query('insert into catalogFish values ("' + req.session.username + '", "' + name + '", ' + recordweight + ')');
                            req.flash('msg2', "");
                            res.redirect('myCatalog');
                        }
                    });
                    
                }
            });
        }
        else if (creature == "Bugs") {
            connection.query('select * from bugs where name = "' + name + '"', function(err, result, fields) {
                if (result.length < 1) {
                    req.flash('msg2', "Are you sure that's a bug in the game?");
                    return res.redirect('addCatchData');
                }
                else {
                    connection.query('select * from catalogBugs where creature = "' + name + '"', function(err, result1, fields) {
                        if (result1.length > 0) {
                            req.flash('msg2', "Dude, you have this bug!");
                            res.redirect('addCatchData');
                        }
                        else {
                            connection.query('insert into catalogBugs values ("' + req.session.username + '", "' + name + '", ' + recordweight + ')');
                            req.flash('msg2', "");
                            res.redirect('myCatalog');
                        }
                    });
                    
                }
            });
        }
        else if (creature == "Deep Sea Creatures") {
            connection.query('select * from deepSeaCreatures where name = "' + name + '"', function(err, result, fields) {
                if (result.length < 1) {
                    req.flash('msg2', "Are you sure that's a deep sea creature in the game?");
                    return res.redirect('addCatchData');
                }
                else {
                    connection.query('select * from catalogDsc where creature = "' + name + '"', function(err, result1, fields) {
                        if (result1.length > 0) {
                            req.flash('msg2', "Dude, you have this deep sea creature!");
                            res.redirect('addCatchData');
                        }
                        else {
                            connection.query('insert into catalogDsc values ("' + req.session.username + '", "' + name + '", ' + recordweight + ')');
                            req.flash('msg2', "");
                            res.redirect('myCatalog');
                        }
                    });
                    
                }
            });
        }
        else {
            req.flash('msg2', "Dude, it's gotta be Fish, Bugs or Deep Sea Creatures");
            res.redirect('addCatchData');
        }
    }
    else {
        res.send("You're missing something... are you logged in?");
        res.end();
    }
});

app.post('/registration', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    if (username && password) {
        connection.query('select * from userInfo WHERE username = ?', [username], function(error, results, fields) {
            if (results.length > 0) {
                req.flash('msg3', 'That username exists...');
                res.redirect('register');
            }
            else {
                connection.query('insert into userInfo values ("' + username + '", "' + password + '", "' + email + '")');
                req.flash('msg1', 'User succesfully registered. Login with your info!');
                res.redirect('login');
            }
            res.end();
        });
    }
    else {
        req.flash('msg1', 'Please enter both username and password to register!');
        res.redirect('login');
        res.end();
    }
});

app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('select * from userInfo WHERE username = ? and password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                req.flash('msg1', '');
                res.redirect('/myCatalog');
            }
            else {
                req.flash('msg1', 'Incorrect username and / or password...');
                res.redirect('login');
            }
            res.end();
        });
    }
    else {
        req.flash('msg1', 'Please enter both username and password!')
        res.redirect('login');
        res.end();
    }
});

app.get('/myCatalog', function(req, res) {
    if (req.session.loggedin) {
        var myFish;
        var myBugs;
        var myDsc;
        userFish = new Promise(function(resolve, reject) {
                    connection.query("select * from catalogFish where username = '" + req.session.username + "'", function(error, results) {
                        if (results == undefined) {
                            reject('fission mailed');
                        }
                        else {
                            myFish = results;
                            resolve(results);
                        }
                    });
                });
        
        userBugs = new Promise(function(resolve, reject) {
                    connection.query("select * from catalogBugs where username = '" + req.session.username + "'", function(error, results) {
                        if (results == undefined) {
                            reject('fission mailed');
                        }
                        else {
                            myBugs = results;
                            resolve(results);
                        }
                    });
                });
        userDsc = new Promise(function(resolve, reject) {
                    connection.query("select * from catalogDsc where username = '" + req.session.username + "'", function(error, results) {
                        if (results == undefined) {
                            reject('fission mailed');
                        }
                        else {
                            myDsc = results;
                            resolve(results);
                        }
                    });
                });
        return Promise.all([userFish, userBugs, userDsc]).then(
            ([userFishVal, userBugsVal, userDscVal]) => { 
                return res.render('catalog', {
                    username: req.session.username, theFish: userFishVal, theBugs: userBugsVal, theDsc: userDscVal
                });}).catch(console.log("gg"));
    }
    else {
        res.redirect('login');
    }
    res.end();
})


module.exports = app;
