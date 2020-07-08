import express from "express";
import { HttpMethod, HttpStatus, HttpRequestHandler } from "./http";
import { Controller } from "./controller";

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

const controller = new Controller();

app.post("/", (req, res) => controller.post(req, res));

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
