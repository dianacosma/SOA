var express = require("express");
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/soa";

var app = express();
var http = require("http");

var bodyParser = require('body-parser');

const PORT = 8081;

var allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
}

// app.configure(() => {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
//})

var server = app.listen(PORT, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server app listening at http://%s:%s", host, port);
});

app.get("/webrtc", (request, response) => {
    setTimeout(() => {
        response.end(JSON.stringify(5));
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

app.post("/user", (request, response) => {
    getOneUser(request.body.username,
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
        (user) => {
            response.end(JSON.stringify(user));
        },
        (error) => {
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

app.get("/allRooms", (request, response) => {
    getAllNonPrivateRooms(
        (rooms) => {
            response.end(JSON.stringify(rooms));
        },
        (error) => {
            response.status(500).send(JSON.stringify(error));
        });
});

app.get("/room/:name", (request, response) => {
    let roomName = request.params.name;
    getRoom(roomName,
        (room) => {
            response.end(JSON.stringify(room));
        },
        (error) => {
            response.status(500).send(JSON.stringify(error));
        });
});

app.post("/newRoom", (request, response) => {
    addRoom(request.body.room,
        request.body.isPrivate,
        (room) => {
            response.end(JSON.stringify(room));
        },
        (error) => {
            response.status(500).send(JSON.stringify(error));
        });
});

function getAllUsers(success, error) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").find({}).toArray(function (err, result) {
            if (err) {
                error(err);
            }
            db.close();
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                success(result);
            }
        });
    });
}

function getUser(username, password, success, error) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            error(err);
        }
        db.collection("users").find({ username, password }).toArray((err, result) => {
            if (err) {
                error(err);
            }
            db.close();
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                success(result);
            }
        });
    });
}


function getOneUser(username, success, error) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            error(err);
        }
        db.collection("users").find({ username: username }).toArray((err, result) => {
            if (err) {
                error(err);
            }
            db.close();
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                console.log(result);
                success(result);
            }
        });
    });
}

function getAllNonPrivateRooms(success, error) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            error(err);
        }
        db.collection("rooms").find({ isPrivate: false }).toArray((err, result) => {
            if (err) {
                error(err);
            }
            db.close();
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                success(result);
            }
        });
    });
}

function addUser(username, password, color, success, error) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            error(err);
        }
        var user = { username, password, color };
        db.collection("users").insertOne(user, function (err, result) {
            if (err) throw err;
            db.close();
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                success(result);
            }
        });
    });
}

function addRoom(room, isPrivate, success, error) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            error(err);
        }
        var room1 = { room, isPrivate };
        db.collection("rooms").insertOne(room1, function (err, result) {
            if (err) throw err;
            db.close();
            // console.log(result);
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                success(result);
            }
        });
    });
}

function getRoom(name, success, error) {
    console.log("room name searched");
    console.log(name);
    MongoClient.connect(url, (err, db) => {
        if (err) {
            error(err);
        }
        db.collection("rooms").find({ room: name }).toArray((err, result) => {
            if (err) {
                error(err);
            }
            db.close();
            console.log(result);
            if (!result || result.length === 0) {
                error({ message: "Not found" });
            } else {
                success(result);
            }
        });
    });
}


function deleteRooms(success, error) {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            error(err);
        }
        db.collection("rooms").drop();
        db.close();
    });
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.createCollection("rooms", function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
}


deleteRooms();

