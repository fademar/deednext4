const express = require("express");
const https = require("https");
const fs = require("fs");
const next = require("next");
const elasticAPI = require("./elastic-api");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const cors = require("cors");

const options = {
  key: fs.readFileSync("./certificates/deed-key.pem"),
  cert: fs.readFileSync("./certificates/deed-cert.pem"),
  ca: fs.readFileSync("./certificates/deed-csr.pem")
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());
    server.use(elasticAPI);

    // handling everything else with Next.js
    server.get("*", handle);

    https.createServer(options, server).listen(process.env.PORT || 3000, () => {
      console.log(`listening on port 3000`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
