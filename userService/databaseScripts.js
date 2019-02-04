var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'soa';

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   db.createCollection("users", function (err, res) {
//     if (err) throw err;
//     console.log("Table created!");
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.createCollection("orders", function(err, res) {
//     if (err) throw err;
//     console.log("Table created!");
//     db.close();
//   });
// });

// (async function () {
//     let client;

//     try {
//         client = await MongoClient.connect(url, { useNewUrlParser: true });
//         console.log("Connected correctly to server");

//         const db = client.db(dbName);
//         db.createCollection("orders", function (err, res) {
//             if (err) throw err;
//             console.log("Table created!");
//         });
//     } catch (err) {
//         console.log(err.stack);
//     }
//     client.close();
// })();

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   db.createCollection("products", function (err, res) {
//     if (err) throw err;
//     console.log("Table created!");
//     db.close();
//   });
// });


// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var myobj = [
// {
//   userid: "7A75B313-B370-4387-BC1B-7F5F6FF8620B",
//   username: "diana",
//   address: "address1",
//   password: "123456",
//   color: "ffd1f6"
// },
//     {
//       userid: "6EDBF1E6-918C-4D2E-8C59-6E81480510E9",
//       username: "alex",
//       address: "address2",
//       password: "123456",
//       color: "9ed8ff"
//     },
//     {
//       userid: "E349AFC9-F6FA-48CD-8A0A-03FCD1F933FA",
//       username: "cristina",
//       address: "address3",
//       password: "123456",
//       color: "1d5324"
//     }
//   ];
//   db.collection("users").insertMany(myobj, function (err, res) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + res.insertedCount);
//     db.close();
//   });
// });

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var myobj = [
//     {
//       productId: "98A2D30E-1CAA-4CF0-B98F-3AA75EC71585",
//       title: "Eyeliner",
//       description: "Black",
//       price: 15.75
//     },
//     {
//       productId: "B6428105-653F-4663-B160-B9A425D05B43",
//       title: "Lipstick",
//       description: "Black",
//       price: 10.15
//     },
//     {
//       productId: "37DA4ACE-7007-4C9C-923C-F0259727F2D8",
//       title: "Foundation",
//       description: "Porcelain",
//       price: 17.25
//     },
//     {
//       productId: "56C14A74-04C6-49CC-8A80-F1D73FF40B7D",
//       title: "Mascara",
//       description: "Black",
//       price: 12.15
//     }
//   ];
//   db.collection("products").insertMany(myobj, function (err, res) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + res.insertedCount);
//     db.close();
//   });
// });

// (async function () {
//     let client;

//     try {
//         client = await MongoClient.connect(url, { useNewUrlParser: true });
//         console.log("Connected correctly to server");

//         const db = client.db(dbName);
//         db.collection("orders").drop();
//     } catch (err) {
//         console.log(err.stack);
//     }
//     client.close();
// })();

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("rooms").find({room: 'a'}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("users").find({username: "diana"}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// (async function () {
//     let client;

//     try {
//         client = await MongoClient.connect(url, { useNewUrlParser: true });
//         console.log("Connected correctly to server");

//         const db = client.db(dbName);
//         var userId = "7A75B313-B370-4387-BC1B-7F5F6FF8620B";
//         db.collection("orders").find({ userId }).toArray((err, result) => {
//             if (err) {
//                 console.log(err);
//                 console.log(err);
//             }
//             if (!result || result.length === 0) {
//                 console.log({ message: "Not found" });
//             } else {
//                 console.log("success");
//                 console.log(result);
//             }
//         });
//     } catch (err) {
//         console.log(err.stack);
//     }
//     client.close();
// })();

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("orders").find({userId: "7A75B313-B370-4387-BC1B-7F5F6FF8620B"}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myquery = { username: 'diana' };
//   db.collection("users").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();
//   });
// });
