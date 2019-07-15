const express = require("express");
const http = require("http");
const next = require("next");
const elasticAPI = require("./elastic-api");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(elasticAPI);

    // handling everything else with Next.js
    server.get("*", handle);

    http.createServer(server).listen(process.env.PORT || 3000, () => {
      console.log(`listening on port 3000`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });