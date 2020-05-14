import express from "express";
import { HttpMethod, HttpStatus } from "./http";
import { page } from "./response";
import { Controller } from "./controller";
import { MongoDbSource } from "./data";

const app = express();
const port = 3500;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    `${HttpMethod.options}, ${HttpMethod.get}, ${HttpMethod.post}, ${HttpMethod.put}, ${HttpMethod.delete}, ${HttpMethod.head}`
  );
  if (HttpMethod.options === req.method) {
    res.sendStatus(HttpStatus.ok);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

const source = new MongoDbSource("mongodb://localhost");
const controller = new Controller(source);
// collection - is a mongodb collection
app.get("/:collection", (req, res) => controller.get(req, res));

// collection - is a mongodb collection
// id - is object id
app.get("/:collection/:id", (req, res) => controller.single(req, res));
app.post("/:collection/:id", (req, res) => controller.post(req, res));
app.put("/:collection/:id", (req, res) => controller.put(req, res));
app.delete("/:collection/:id", (req, res) => controller.delete(req, res));
app.head("/:collection/:id", (req, res) => controller.head(req, res));

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
