const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const { Client } = require("@elastic/elasticsearch");
const readLine = require("readline");
const ObjectId = require("mongodb").ObjectID;
const cors = require("cors");

const router = express.Router();

const client = new Client({
  node: "http://192.168.44.41:8080"
});

router.use(bodyParser.json());

router.options("*", cors());

router.get("/elasticapi/textfields", cors(), (req, res) => {
  client.indices.getFieldMapping(
    { index: "deeds", fields: "*.keyword" },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        const arrayTextField = [];
        Object.keys(response.body.deeds.mappings)
          .sort()
          .map(o => {
            arrayTextField.push(o.replace(".keyword", ""));
          });
        res.send(arrayTextField);
      }
    }
  );
});

router.get("/elasticapi/mapping", cors(), (req, res) => {
  client.indices.getMapping({ index: "deeds" }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.body.deeds.mappings.properties);
    }
  });
});

router.get("/elasticapi/numfields", cors(), (req, res) => {
  client.indices.getFieldMapping(
    { index: "deeds", fields: "*" },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        const arrayNumField = [];
        Object.keys(response.body.deeds.mappings)
          .sort()
          .map(o => {
            if (o.indexOf(".rubli") !== -1) arrayNumField.push(o);
            if (o.indexOf(".altyny") !== -1) arrayNumField.push(o);
            if (o.indexOf(".dengi") !== -1) arrayNumField.push(o);
            if (o.indexOf(".nbParticipants") !== -1) arrayNumField.push(o);
            if (o.indexOf(".numberOfParticipants") !== -1)
              arrayNumField.push(o);
            if (o.indexOf("schemaVersion") !== -1) arrayNumField.push(o);
          });
        res.send(arrayNumField);
      }
    }
  );
});

router.get("/elasticapi/boolfields", cors(), (req, res) => {
  client.indices.getFieldMapping(
    { index: "deeds", fields: "*" },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        const arrayBoolField = [];
        Object.keys(response.body.deeds.mappings)
          .sort()
          .map(o => {
            if (o.indexOf(".collected") !== -1) arrayBoolField.push(o);
            if (o.indexOf("complete") !== -1) arrayBoolField.push(o);
            if (o.indexOf(".advancePayment") !== -1) arrayBoolField.push(o);
            if (o.indexOf(".partialAdvance") !== -1) arrayBoolField.push(o);
          });
        res.send(arrayBoolField);
      }
    }
  );
});

// RESTRUCTURING THE DATASOURCE TO ADD THE OBJECT TYPE

router.get("/elasticapi/data", cors(), (req, res) => {
  const readStream = fs.createReadStream("./miscellaneous/login.ndjson");
  const writeStream = fs.createWriteStream("./miscellaneous/logout1.ndjson", {
    encoding: "utf8"
  });
  const lineReader = readLine.createInterface({
    input: readStream
  });
  let i = 849;
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

router.get("/elasticapi/coins", cors(), (req, res) => {
  const readStream = fs.createReadStream("./miscellaneous/logout1.ndjson");
  const writeStream = fs.createWriteStream("./miscellaneous/logout2.ndjson", {
    encoding: "utf8"
  });
  const lineReader = readLine.createInterface({
    input: readStream
  });

  lineReader.on("line", line => {
    let newLine = line.replace("\n", "");
    let json = JSON.parse(newLine);
    let feeArray = [];
    let taxArray = [];
    if (json.mongo_id) {
      delete json.agentSex;
      delete json.counterAgentSex;
    }
    if (json.fees) {
      taxArray.push({
        coins: "unspecified",
        rubli: json.fees.tax.roubles || 0,
        altyny: json.fees.tax.altyn || 0,
        dengi: json.fees.tax.denga || 0
      });

      json.fees.tax["amount"] = taxArray;
      delete json.fees.tax.roubles;
      delete json.fees.tax.altyn;
      delete json.fees.tax.denga;

      feeArray.push({
        coins: "unspecified",
        rubli: json.fees.fee.roubles || 0,
        altyny: json.fees.fee.altyn || 0,
        dengi: json.fees.fee.denga || 0
      });

      json.fees.fee["amount"] = feeArray;
      delete json.fees.fee.roubles;
      delete json.fees.fee.altyn;
      delete json.fees.fee.denga;
    }
    if (json.transactions) {
      json.transactions.forEach(transaction => {
        delete transaction.counterAgentTransactionObjectType;
        delete transaction.agentTransactionObjectType;
        if (transaction.agentTransactionObjects.length > 0) {
          transaction.agentTransactionObjects.forEach(
            agentTransactionObject => {
              if (agentTransactionObject.object[0] === "debt") {
                let coinArrayDebtAgent = [];
                if (agentTransactionObject.debt.amount.moscowSilver) {
                  if (
                    agentTransactionObject.debt.amount.moscowSilver.rubli !==
                      "" ||
                    agentTransactionObject.debt.amount.moscowSilver.altyny !==
                      "" ||
                    agentTransactionObject.debt.amount.moscowSilver.dengi !== ""
                  ) {
                    coinArrayDebtAgent.push({
                      coins: "silver",
                      rubli:
                        agentTransactionObject.debt.amount.moscowSilver.rubli ||
                        0,
                      altyny:
                        agentTransactionObject.debt.amount.moscowSilver
                          .altyny || 0,
                      dengi:
                        agentTransactionObject.debt.amount.moscowSilver.dengi ||
                        0
                    });
                  } // END ID MOSCOWSILVER IS NOT NULL
                  if (
                    agentTransactionObject.debt.amount.chekhi.rubli !== "" ||
                    agentTransactionObject.debt.amount.chekhi.altyny !== "" ||
                    agentTransactionObject.debt.amount.chekhi.dengi !== ""
                  ) {
                    coinArrayDebtAgent.push({
                      coins: "chekhi",
                      rubli:
                        agentTransactionObject.debt.amount.chekhi.rubli || 0,
                      altyny:
                        agentTransactionObject.debt.amount.chekhi.altyny || 0,
                      dengi:
                        agentTransactionObject.debt.amount.chekhi.dengi || 0
                    });
                  } // END IF CHEKHI IS NOT NULL
                  delete agentTransactionObject.debt.amount.moscowSilver;
                  delete agentTransactionObject.debt.amount.chekhi;
                  agentTransactionObject.debt.amount = coinArrayDebtAgent;
                } // END IF MOSCOWSILVER EXISTS
              } // END IF AGENT TRANSACTION OBJECT IS DEBT
              if (agentTransactionObject.object[0] === "money") {
                let coinArrayMoneyAgent = [];
                if (agentTransactionObject.money.amount) {
                  if (agentTransactionObject.money.amount.moscowSilver) {
                    if (
                      agentTransactionObject.money.amount.moscowSilver.rubli !==
                        "" ||
                      agentTransactionObject.money.amount.moscowSilver
                        .altyny !== "" ||
                      agentTransactionObject.money.amount.moscowSilver.dengi !==
                        ""
                    ) {
                      coinArrayMoneyAgent.push({
                        coins: "silver",
                        rubli:
                          agentTransactionObject.money.amount.moscowSilver
                            .rubli || 0,
                        altyny:
                          agentTransactionObject.money.amount.moscowSilver
                            .altyny || 0,
                        dengi:
                          agentTransactionObject.money.amount.moscowSilver
                            .dengi || 0
                      });
                    } // END ID MOSCOWSILVER IS NOT NULL
                    if (
                      agentTransactionObject.money.amount.chekhi.rubli !== "" ||
                      agentTransactionObject.money.amount.chekhi.altyny !==
                        "" ||
                      agentTransactionObject.money.amount.chekhi.dengi !== ""
                    ) {
                      coinArrayMoneyAgent.push({
                        coins: "chekhi",
                        rubli:
                          agentTransactionObject.money.amount.chekhi.rubli || 0,
                        altyny:
                          agentTransactionObject.money.amount.chekhi.altyny ||
                          0,
                        dengi:
                          agentTransactionObject.money.amount.chekhi.dengi || 0
                      });
                    } // END IF CHEKHI IS NOT NULL
                    delete agentTransactionObject.money.amount;
                    agentTransactionObject.money = coinArrayMoneyAgent;
                  } // END IF MOSCOWSILVER EXISTS
                }
              } // END IF AGENTTRANSACTIONOBJECT IS MONEY
            }
          ); // END FOREACH AGENTTRANSACTIONOBJECTS
        } // END IF TRANSACTIONOBJECTS ARRAY LENGTH IS NOT 0
        if (transaction.counterAgentTransactionObjects.length > 0) {
          transaction.counterAgentTransactionObjects.forEach(
            counterAgentTransactionObject => {
              if (counterAgentTransactionObject.object[0] === "debt") {
                let coinArrayDebtCounter = [];
                if (counterAgentTransactionObject.debt.amount.moscowSilver) {
                  if (
                    counterAgentTransactionObject.debt.amount.moscowSilver
                      .rubli !== "" ||
                    counterAgentTransactionObject.debt.amount.moscowSilver
                      .altyny !== "" ||
                    counterAgentTransactionObject.debt.amount.moscowSilver
                      .dengi !== ""
                  ) {
                    coinArrayDebtCounter.push({
                      coins: "silver",
                      rubli:
                        counterAgentTransactionObject.debt.amount.moscowSilver
                          .rubli || 0,
                      altyny:
                        counterAgentTransactionObject.debt.amount.moscowSilver
                          .altyny || 0,
                      dengi:
                        counterAgentTransactionObject.debt.amount.moscowSilver
                          .dengi || 0
                    });
                  } // END ID MOSCOWSILVER IS NOT NULL
                  if (
                    counterAgentTransactionObject.debt.amount.chekhi.rubli !==
                      "" ||
                    counterAgentTransactionObject.debt.amount.chekhi.altyny !==
                      "" ||
                    counterAgentTransactionObject.debt.amount.chekhi.dengi !==
                      ""
                  ) {
                    coinArrayDebtCounter.push({
                      coins: "chekhi",
                      rubli:
                        counterAgentTransactionObject.debt.amount.chekhi.rubli,
                      altyny:
                        counterAgentTransactionObject.debt.amount.chekhi.altyny,
                      dengi:
                        counterAgentTransactionObject.debt.amount.chekhi.dengi
                    });
                  } // END IF CHEKHI IS NOT NULL
                  delete counterAgentTransactionObject.debt.amount.moscowSilver;
                  delete counterAgentTransactionObject.debt.amount.chekhi;
                  counterAgentTransactionObject.debt.amount = coinArrayDebtCounter;
                } // END IF MOSCOWSILVER EXISTS
              } // END IF AGENT TRANSACTION OBJECT IS DEBT
              if (counterAgentTransactionObject.object[0] === "money") {
                let coinArrayMoneyCounter = [];
                if (counterAgentTransactionObject.money.amount) {
                  if (counterAgentTransactionObject.money.amount.moscowSilver) {
                    if (
                      counterAgentTransactionObject.money.amount.moscowSilver
                        .rubli !== "" ||
                      counterAgentTransactionObject.money.amount.moscowSilver
                        .altyny !== "" ||
                      counterAgentTransactionObject.money.amount.moscowSilver
                        .dengi !== ""
                    ) {
                      coinArrayMoneyCounter.push({
                        coins: "silver",
                        rubli:
                          counterAgentTransactionObject.money.amount
                            .moscowSilver.rubli || 0,
                        altyny:
                          counterAgentTransactionObject.money.amount
                            .moscowSilver.altyny || 0,
                        dengi:
                          counterAgentTransactionObject.money.amount
                            .moscowSilver.dengi || 0
                      });
                    } // END ID MOSCOWSILVER IS NOT NULL
                    if (
                      counterAgentTransactionObject.money.amount.chekhi
                        .rubli !== "" ||
                      counterAgentTransactionObject.money.amount.chekhi
                        .altyny !== "" ||
                      counterAgentTransactionObject.money.amount.chekhi
                        .dengi !== ""
                    ) {
                      coinArrayMoneyCounter.push({
                        coins: "chekhi",
                        rubli:
                          counterAgentTransactionObject.money.amount.chekhi
                            .rubli || 0,
                        altyny:
                          counterAgentTransactionObject.money.amount.chekhi
                            .altyny || 0,
                        dengi:
                          counterAgentTransactionObject.money.amount.chekhi
                            .dengi || 0
                      });
                    } // END IF CHEKHI IS NOT NULL
                    delete counterAgentTransactionObject.money.amount;
                    counterAgentTransactionObject.money = coinArrayMoneyCounter;
                  }
                } // END IF MOSCOWSILVER EXISTS
              } // END IF AGENTTRANSACTIONOBJECT IS MONEY
            }
          ); // END FOREACH COUNTERAGENTTRANSACTIONOBJECTS
        } // END IF COUNTERAGENTTRANSACTIONOBJECTS ARRAY LENGTH IS NOT 0
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

router.get("/elasticapi/coins-zero", cors(), (req, res) => {
  const readStream = fs.createReadStream("./miscellaneous/logout2.ndjson");
  const writeStream = fs.createWriteStream("./miscellaneous/logout3.ndjson", {
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
        if (transaction.agentTransactionObjects.length > 0) {
          transaction.agentTransactionObjects.forEach(
            agentTransactionObject => {
              if (agentTransactionObject.object[0] === "money") {
                agentTransactionObject.money.forEach(money => {
                  if (money.rubli === "") {
                    money.rubli = 0;
                  }
                  if (money.altyny === "") {
                    money.altyny = 0;
                  }
                  if (money.dengi === "") {
                    money.dengi = 0;
                  }
                });
              } // END IF AGENTTRANSACTIONOBJECT IS MONEY
            }
          ); // END FOREACH AGENTTRANSACTIONOBJECTS
        } // END IF TRANSACTIONOBJECTS ARRAY LENGTH IS NOT 0
        if (transaction.counterAgentTransactionObjects.length > 0) {
          transaction.counterAgentTransactionObjects.forEach(
            counterAgentTransactionObject => {
              if (counterAgentTransactionObject.object[0] === "money") {
                counterAgentTransactionObject.money.forEach(money => {
                  if (money.rubli === "") {
                    money.rubli = 0;
                  }
                  if (money.altyny === "") {
                    money.altyny = 0;
                  }
                  if (money.dengi === "") {
                    money.dengi = 0;
                  }
                });
              } // END IF AGENTTRANSACTIONOBJECT IS MONEY
            }
          ); // END FOREACH COUNTERAGENTTRANSACTIONOBJECTS
        } // END IF COUNTERAGENTTRANSACTIONOBJECTS ARRAY LENGTH IS NOT 0
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

router.get("/elasticapi/dates", cors(), (req, res) => {
  const readStream = fs.createReadStream("./miscellaneous/logout3.ndjson");
  const writeStream = fs.createWriteStream("./miscellaneous/logout4.ndjson", {
    encoding: "utf8"
  });
  const lineReader = readLine.createInterface({
    input: readStream
  });

  lineReader.on("line", line => {
    let newLine = line.replace("\n", "");
    let json = JSON.parse(newLine);
    if (json.deedDate) {
      json.deedDate.day === ""
        ? (json.deedDate.day = null)
        : (json.deedDate.day = parseInt(json.deedDate.day, 10));
      json.deedDate.month === ""
        ? (json.deedDate.month = null)
        : (json.deedDate.month = parseInt(json.deedDate.month, 10));
      json.deedDate.year === ""
        ? (json.deedDate.year = null)
        : (json.deedDate.year = parseInt(json.deedDate.year, 10));
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
