const express = require("express");
const app = express();

app.head("/csrf-token", async (req, res) => {
  res
    .status(200)
    .header("x-csrf-token", "abc")
    .header("set-cookie", "foo=bar")
    .send();
});

app.post("/csrf-token", async (req, res) => {
  if (req.headers["x-csrf-token"] === "abc") {
    res.send("Request with token");
  } else {
    res.send("Request without token");
  }
});

app.get("/encoding", async (req, res) => {
  res.send(req.url);
});

app.get("/origin", async (req, res) => {
  const result = req.headers;
  result["requestUrl"] = req.url;
  res.send(JSON.stringify(result));
});

app.get("/ping", async (req, res) => {
  res.send("pong");
});

exports.app = app;
