const bodyParser = require("body-parser");
const express = require("express");
const { Client } = require("@elastic/elasticsearch");
var _ = require("lodash");

const router = express.Router();
const client = new Client({ node: "http://localhost:9200" });

router.use(bodyParser.json());

router.get("/elasticapi/fields", (req, res) => {
  client.indices.getFieldMapping(
    { index: "deeds", fields: "*.keyword" },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        const arrayFields = Object.keys(response.body.deeds.mappings)
          .sort()
          .map(o => {
            return o.replace(".keyword", "");
          });
        res.send(arrayFields);
      }
    }
  );
});

module.exports = router;
