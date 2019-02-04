var express = require("express");
var MongoClient = require('mongodb').MongoClient;

var localPort = 8081;
var dockerPort = 49165;

const url = 'mongodb://localhost:27017';
const dbName = 'soa';

var app = express();
var http = require("http");

var bodyParser = require('body-parser');

const PORT = localPort;

var allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
}

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);

var server = app.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server app listening at http://%s:%s", host, port);
});

app.get("/ping", (request, response) => {
    setTimeout(() => {
        response.end("pong");
    }, 5000);
});

app.post("/login", (request, response) => {
    getUser(request.body.username,
        request.body.password,
        (user) => {
            response.end(JSON.stringify(user));
        },
        (error) => {
            console.log(error);
            response.status(500).send(JSON.stringify(error));
        });
});

app.post("/register", (request, response) => {
    addUser(request.body.username,
        request.body.password,
        request.body.color,
        request.body.address,
        (user) => {
            response.end(JSON.stringify(user));
        },
        (error) => {
            response.status(500).send(JSON.stringify(error));
        });
});

app.post("/user", (request, response) => {
    console.log(request.body);
    getOneUser(request.body.username,
        (user) => {
            response.end(JSON.stringify(user));
        },
        (error) => {
            console.log(error);
            response.status(500).send(JSON.stringify(error));
        });
});

app.get("/allUsers", (request, response) => {
    getAllUsers(
        (users) => {
            response.end(JSON.stringify(users));
        },
        (error) => {
            response.status(500).send(JSON.stringify(error));
        });
});

function getAllUsers(success, error) {
    (async function () {
        let client;

        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            db.collection("users").find({}).toArray((err, result) => {
                if (err) {
                    error(err);
                }
                if (!result || result.length === 0) {
                    error({ message: "Not found" });
                } else {
                    success(result);
                }
            });
        } catch (err) {
            console.log(err.stack);
        }
        client.close();
    })();
}

function getUser(username, password, success, error) {
    (async function () {
        let client;

        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            db.collection("users").find({username, password}).toArray((err, result) => {
                if (err) {
                    console.log(err);
                    error(err);
                }
                if (!result || result.length === 0) {
                    error({ message: "Not found" });
                } else {
                    success(result);
                }
            });
        } catch (err) {
            console.log(err.stack);
        }
        client.close();
    })();
}

function getOneUser(username, success, error) {
    (async function () {
        let client;

        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            db.collection("users").find({ username: "diana" }).toArray((err, result) => {
                if (err) {
                    error(err);
                }
                if (!result || result.length === 0) {
                    error({ message: "Not found" });
                } else {
                    success(result);
                }
            });
        } catch (err) {
            console.log(err.stack);
        }
        client.close();
    })();
}

function addUser(username, password, color, address, success, error) {
    (async function() {
        let client;
      
        try {
          client = await MongoClient.connect(url,{ useNewUrlParser: true });
          console.log("Connected correctly to server");
      
          const db = client.db(dbName);
          const userid = guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
          var user = { userid, username, password, color, address };
          db.collection("users").insertOne(user, function (err, result) {
            if (err) throw err;
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                success(result);
            }
        });
    
        } catch (err) {
          console.log(err.stack);
        }
      
        // Close connection
        client.close();
      })();
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}