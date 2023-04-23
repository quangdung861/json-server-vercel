// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const auth = require("json-server-auth");
const moment = require("moment");

var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors({
    origin: "*",
}));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Add headers before the routes are defined

server.use(middlewares);
server.use(jsonServer.bodyParser);
// Add this before server.use(router)

server.use((req, res, next) => {
//   jsonServer.rewriter({
//     "/api/*": "/$1",
//     "/blog/:resource/:id/show": "/:resource/:id",
//   });

  if (req.method === "POST") {
    req.body.createdAt = moment().valueOf();
    req.body.updatedAt = moment().valueOf();
  }

  if (req.method === "PUT") {
    req.method = "PATCH";
  }

  if (req.method === "PATCH") {
    req.body.updatedAt = moment().valueOf();
  }

  next();
});

server.use(router);
server.use(auth);
app.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
