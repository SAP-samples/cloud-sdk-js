import express from "express";
const app = express();
const port = 3000;

// For unit tests
let autoShutdown = false;
const args = process.argv.slice(2);
if (args[0] === "--auto-shutdown") {
  autoShutdown = true;
}

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

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// For unit tests
if (autoShutdown) {
  setTimeout(() => server.close(), 3000);
}
