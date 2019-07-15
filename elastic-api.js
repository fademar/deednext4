const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const { Client } = require("@elastic/elasticsearch");
const readLine = require("readline");

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

router.get("/elasticapi/data", (req, res) => {
  const readStream = fs.createReadStream(
    "./miscellaneous/deeds_for_index.ndjson"
  );
  const writeStream = fs.createWriteStream("./miscellaneous/logout.ndjson", {
    encoding: "utf8"
  });
  const lineReader = readLine.createInterface({
    input: readStream
  });
  lineReader.on("line", line => {
    let newLine = line.replace("\n", "");
    let json = JSON.parse(newLine);
    if (json.transactions) {
      json.transactions.forEach(transaction => {
        if (transaction.agentTransactionObjects) {
          transaction.agentTransactionObjects.forEach(
            agentTransactionObject => {
              agentTransactionObject.object = Object.keys(
                agentTransactionObject
              );
            }
          );
        }
        if (transaction.counterAgentTransactionObjects) {
          transaction.counterAgentTransactionObjects.forEach(
            counterAgentTransactionObject => {
              counterAgentTransactionObject.object = Object.keys(
                counterAgentTransactionObject
              );
            }
          );
        }
      });
    }
    let stringLine = JSON.stringify(json) + "\n";
    writeStream.write(stringLine);
  });
  lineReader.on("close", () => {
    writeStream.end();
  });
  res.end();
});

module.exports = router;
