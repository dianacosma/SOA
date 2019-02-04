var express = require("express");
var MongoClient = require('mongodb').MongoClient;

var localPort = 8082;
var dockerPort = 49166;

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

app.post("/order", (request, response) => {
    order(request.body.products,
        request.body.userId,
        (user) => {
            response.end(JSON.stringify(user));
        },
        (error) => {
            response.status(500).send(JSON.stringify(error));
        });
});

app.get("/allProducts", (request, response) => {
    getAllProducts(
        (products) => {
            response.end(JSON.stringify(products));
        },
        (error) => {
            response.status(500).send(JSON.stringify(error));
        });
});

app.post("/allOrders", (request, response) => {
    console.log(request.body);
    getAllOrders(
        request.body.userId,
        (orders) => {
            response.send(JSON.stringify(orders));
        },
        (error) => {
            response.send(JSON.stringify(error));
        });
});

function getAllProducts(success, error) {
    (async function () {
        let client;

        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            db.collection("products").find({}).toArray((err, result) => {
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

function getAllOrders(userId, success, error) {
    (async function () {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("Connected correctly to server");

            const db = client.db(dbName);
            db.collection("orders").find({ userId }).toArray((err, result) => {
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

function order(products, userId, success, error) {
    (async function () {
        let client;

        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("Connected correctly to server");
            const db = client.db(dbName);
            const orderId = guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            var order = { products, userId, orderId };
            db.collection("orders").insertOne(order, function (err, result) {
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
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}