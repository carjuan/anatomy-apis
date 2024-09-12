const http = require("http");
const { open } = require("node:fs/promises");

const PORT = 8000;

const handlers = {
  GET: {
    "/": (_, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      open("./public/assets/index.html").then((fd) => {
        fd.createReadStream()
          .on("data", (chunk) => {
            res.write(chunk);
          })
          .on("close", () => {
            res.end();
          });
      });
      // fd.createReadSteam().pipe(res);
    },
    "/public/assets/style.css": (req, res) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      open("./public/assets/style.css").then((fd) => {
        fd.createReadStream()
          .on("data", (chunk) => {
            res.write(chunk);
          })
          .on("close", () => {
            res.end();
          });
      });
    },
    "/public/assets/script.js": (req, res) => {
      res.writeHead(200, { "Content-Type": "/" });
      open("./public/assets/script.js").then((fd) => {
        fd.createReadStream()
          .on("data", (chunk) => {
            res.write(chunk);
          })
          .on("close", () => {
            res.end();
          });
      });
    },
    "/blogs": (req, res) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(
        JSON.stringify({
          data: "You initialized a GET request and reached blogs end point. End of the response",
        }),
      );
    },
    "/notes": (req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: "You initialized a GET request and reached notes end point. End of the response",
        }),
      );
    },
  },
  // Preflight requests. Use in custom middleware
  OPTIONS: {
    "/blogs": (req, res) => {
      console.log(req.url);
      res.writeHead(200, {
        Allow: "GET",
        Date: new Date(),
        Server: "Custom Server",
      });
      res.end();
    },
  },
};

const requestHandler = (req, res) => {
  const REQUEST = req.method;
  const handle = handlers[REQUEST];
  console.log(`incoming request ${req.method} ${req.url}`);
  if (handle) {
    const PATH = req.url;
    const pathHandler = handle[PATH];
    if (pathHandler) {
      return pathHandler(req, res);
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        data: `Bad request path ${PATH}`,
      }),
    );
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: `unkown request ${req.method}`,
    }),
  );
};

const server = http.createServer();

server.on("request", requestHandler);

const onServerStart = () => console.log(`Server started using port: ${PORT}`);

server.listen(8000, onServerStart);
