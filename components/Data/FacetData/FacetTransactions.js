import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import { DataSearch, MultiList } from "@appbaseio/reactivesearch";

function FacetTransactions(props) {
  const [action, setAction] = useState([""]);
  const [visibility, setVisibility] = useState("none");

  useEffect(() => {
    action.map(item => {
      switch (item) {
        case "engages":
          console.log("engages");
          div += <p>{item}</p>;
          break;
        case "donates":
          console.log("donates");
          div += <p>{item}</p>;
          break;
        case "exchanges":
          console.log("exchanges");
          div += <p>{item}</p>;
          break;
        default:
          console.log("blabla");
      }
    });
  });

  return (
    <>
      <div>
        <p>You clicked {action}</p>
      </div>
      {/* AGENT */}
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Agent Action</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId="agentActionSensor"
          dataField="transactions.agentAction.keyword"
          sortBy="asc"
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "agentActionSensor")
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Agent Action"}
          URLParams={true}
          title="Action"
          onValueChange={value => {
            setAction(value);
          }}
        />
        <MultiList
          style={{ padding: "10px" }}
          componentId="agentTransactionObjectsSensor"
          dataField="transactions.agentTransactionObjects.activity.keyword"
          sortBy="asc"
          showCheckbox
          react={{
            and: sensorsList(
              props.sensors,
              "agentAagentTransactionObjectsSensorctionSensor"
            )
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Agent Transaction Object"}
          URLParams={true}
          title="Transaction Object"
          onValueChange={value => {
            setAction(value);
          }}
        />
      </div>
    </>
  );
}

function sensorsList(array, name) {
  array.splice(array.indexOf(name), 1);
  return array;
}

export default FacetTransactions;
