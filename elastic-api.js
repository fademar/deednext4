const bodyParser = require("body-parser");
const express = require("express");
const { Client } = require("@elastic/elasticsearch");
var _ = require("lodash");

const router = express.Router();
const client = new Client({ node: "http://localhost:9200" });

router.use(bodyParser.json());

router.get("/elasticapi/fields", (req, res) => {
  client.indices.getMapping({ index: "deeds" }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.body.deeds.mappings.properties);
    }
  });
});

module.exports = router;
