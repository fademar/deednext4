const bodyParser = require("body-parser");
const express = require("express");
const { Client } = require("@elastic/elasticsearch");
var _ = require("lodash");

const router = express.Router();
const client = new Client({ node: "http://localhost:9200" });

router.use(bodyParser.json());

router.get("/elasticapi/fields", (req, res) => {
  client.indices.getFieldMapping(
    { index: "deeds", fields: "*" },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(
          _.sortedUniq(
            _.filter(Object.keys(response.body.deeds.mappings), function(o) {
              return !o.includes(".keyword") && !o.includes("_");
            }).sort()
          )
        );
      }
    }
  );
});

module.exports = router;
