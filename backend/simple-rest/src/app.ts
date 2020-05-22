import express from "express";
import { HttpMethod, HttpStatus, HttpRequestHandler } from "./http";
import { Controller } from "./controller";
import { MongoDbSource, DataSource } from "./data";

const app = express();
const port = 9090;

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header(
    "Access-Control-Allow-Methods",
    `${HttpMethod.options}, ${HttpMethod.get}, ${HttpMethod.post}, ${HttpMethod.put}, ${HttpMethod.delete}, ${HttpMethod.head}`
  );
  if (HttpMethod.options === req.method) {
    res.sendStatus(HttpStatus.ok);
    return;
  }
  console.log(`${req.ip} ${req.method} ${req.url}`);
  next();
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

const source: DataSource = new MongoDbSource("mongodb://nas/miniCMS");
const controller = new Controller(source);
// collection - is a mongodb collection
app.get("/:collection", (req, res) => controller.get(new HttpRequestHandler(req, res)));

// collection - is a mongodb collection
// id - is object id
app.get("/:collection/:id", (req, res) => {
  const handler = new HttpRequestHandler(req, res);
  switch (req.method) {
    case HttpMethod.get:
      controller.single(handler);
      break;
    case HttpMethod.head:
      controller.head(handler);
      break;
    default:
      handler.handle(new Error("Method not allowed"), (reqest, response) => undefined); // there will be no next call
  }
});
app.post("/:collection", (req, res) => controller.post(new HttpRequestHandler(req, res)));
app.put("/:collection/:id", (req, res) => controller.put(new HttpRequestHandler(req, res)));
app.delete("/:collection/:id", (req, res) => controller.delete(new HttpRequestHandler(req, res)));

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
