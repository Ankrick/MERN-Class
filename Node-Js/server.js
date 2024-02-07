const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  res.write("<h1>Hello world</h1>");

  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("server listening on port 3000");
});
