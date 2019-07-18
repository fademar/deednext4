const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const { Client } = require("@elastic/elasticsearch");
const readLine = require("readline");
const ObjectId = require("mongodb").ObjectID;

const router = express.Router();
const client = new Client({ node: "http://localhost:9200" });

router.use(bodyParser.json());

const mongoIds = [];

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

// RESTRUCTURING THE DATASOURCE TO ADD THE OBJECT TYPE

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
  let i = 840;
  lineReader.on("line", line => {
    let newLine = line.replace("\n", "");
    let json = JSON.parse(newLine);
    if (json.mongo_id) {
      json["createdTime"] = new ObjectId(json.mongo_id).getTimestamp();
    }
    if (json.agentSex) {
      json.agent["sex"] = json.agentSex;
    }
    if (json.counterAgentSex) {
      json.counterAgent["sex"] = json.counterAgentSex;
    }
    if (json.coAgents) {
      json.coAgents.forEach(coAgent => {
        if (coAgent.coAgentSex) {
          coAgent.coAgent["sex"] = coAgent.coAgentSex;
        }
      });
    }
    if (json.coCounterAgents) {
      json.coCounterAgents.forEach(coCounterAgent => {
        if (coCounterAgent.coCounterAgentSex) {
          coCounterAgent.coCounterAgent["sex"] =
            coCounterAgent.coCounterAgentSex;
        }
      });
    }
    if (json.index) {
      json.index = { _id: i };
      i--;
    }
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

router.get("/elasticapi/data2", (req, res) => {
  console.log(mongoIds);
  let i = 0;
  const readStream = fs.createReadStream("./miscellaneous/logout.ndjson");
  const writeStream = fs.createWriteStream("./miscellaneous/newlogout.ndjson", {
    encoding: "utf8"
  });
  const lineReader = readLine.createInterface({
    input: readStream
  });
  lineReader.on("line", line => {
    let newLine = line.replace("\n", "");
    let json = JSON.parse(newLine);
    if (json.index) {
      json.index = { _id: mongoIds[i] };
      i++;
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
