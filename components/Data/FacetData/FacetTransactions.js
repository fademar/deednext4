import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import { DataSearch, MultiList } from "@appbaseio/reactivesearch";

function FacetTransactions(props) {
  const [agentAction, setAgentAction] = useState([]);
  const [counterAgentAction, setCounterAgentAction] = useState([]);
  const what = [
    "chattels",
    "debt",
    "dependent",
    "forfeit",
    "fugitive souls",
    "goods",
    "immovable property",
    "money",
    "parent",
    "responsibilities",
    "share from estate",
    "souls"
  ];

  const [objects, setObjects] = useState([]);

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Agent</Divider>
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
            value.map(e => {
              switch (e) {
                case "engages":
                  e = "asWhom";
                  break;
                case "agrees to marry-off":
                  e = "dependent";
                  break;
                default:
                  e;
              }
              return value;
            });
            setAgentAction(value);
          }}
        />
        {/* {(() => {
          console.log(action);
          action.map(item => {
              let field;
              switch (item) {
                  case ""
              }
            renderAgentTransactionObject(props, field);
          });
        })()} */}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Counter Agent</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId="counterAgentActionSensor"
          dataField="transactions.counterAgentAction.keyword"
          sortBy="asc"
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "counterAgentActionSensor")
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"CounterAgent Action"}
          URLParams={true}
          title="Action"
          onValueChange={value => {
            setCounterAgentAction(value);
          }}
        />
        {/* {(() => {
          console.log(action);
          action.map(item => {
              let field;
              switch (item) {
                  case ""
              }
            renderAgentTransactionObject(props, field);
          });
        })()} */}
      </div>
    </>
  );
}

function sensorsList(array, name) {
  array.splice(array.indexOf(name), 1);
  return array;
}

function renderAgentTransactionObject(props, item) {
  return (
    <MultiList
      style={{ padding: "10px" }}
      componentId={"agentTransactionObject" + item + "Sensor"}
      dataField={"transactions.agentTransactionObjects." + item + ".keyword"}
      sortBy="asc"
      showCheckbox
      react={{
        and: sensorsList(
          props.sensors,
          "agentTransactionObject" + item + "Sensor"
        )
      }}
      showSearch={false}
      showFilter
      showCount={true}
      filterLabel={"Agent Transaction Object"}
      URLParams={true}
      title={"Transaction Object: " + item}
    />
  );
}

export default FacetTransactions;
