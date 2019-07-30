const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const hubsRouter = require("./hubs/hubs-router.js");
const logger = require("morgan");
const server = express();

server.use(logger("dev"));
server.use(express.json());
server.use(helmet());
server.use(methodLogger);
server.use("/api/hubs", hubsRouter);
server.use(addName);
// server.use(lockout);
server.use(test);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function methodLogger(req, res, next) {
  console.log(`${req.method} request recieved`);
  next();
}

function addName(req, res, next) {
  req.name = "Braden";
  next();
}

function lockout(req, res, next) {
  res.status(403).json({ message: "API locked out" });
}

function test(req, res, next) {
  var d = new Date();
  var n = d.getSeconds();
  console.log(n);

  if (n % 3 === 0) {
    res
      .status(403)
      .json({ message: "current second is divisible by 3, so sorry." });
  } else {
    next();
  }
}

module.exports = server;
