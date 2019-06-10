const bodyParser = require("body-parser");
const express = require("express");
const { Client } = require("@elastic/elasticsearch");

const router = express.Router();
const client = new Client({ node: "http://localhost:9200" });

const flatten = (obj, prefix = "", res = {}) =>
  Object.entries(obj).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    if (typeof val === "object") {
      flatten(val, `${k}.`, r);
    } else {
      res[k] = val;
    }
    return r;
  }, res);

router.use(bodyParser.json());

router.get("/elasticapi/fields", (req, res) => {
  client.indices.getFieldMapping(
    { index: "deeds", fields: "*" },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(Object.keys(response.body.deeds.mappings));
      }
    }
  );
});

module.exports = router;
