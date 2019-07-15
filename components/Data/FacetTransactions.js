import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import {
  DataSearch,
  MultiList,
  MultiDropdownList
} from "@appbaseio/reactivesearch";

function FacetTransactions(props) {
  const [agentAction, setAgentAction] = useState([]);
  const [counterAgentAction, setCounterAgentAction] = useState([]);
  const [showEngages, setShowEngages] = useState("none");
  const [showWhatObject, setShowWhatObject] = useState("none");

  const whatObject = [
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

  useEffect(() => {
    agentAction.indexOf("engages") >= 0
      ? setShowEngages("block")
      : setShowEngages("none");
    agentAction.indexOf("cedes") >= 0 ||
    agentAction.indexOf("exchanges") >= 0 ||
    agentAction.indexOf("mortgages") >= 0 ||
    agentAction.indexOf("puts to rent") >= 0 ||
    agentAction.indexOf("sells") >= 0 ||
    agentAction.indexOf("bequeaths") >= 0
      ? setShowWhatObject("block")
      : setShowWhatObject("none");
  }, [agentAction]);

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
          URLParams={false}
          title="Action"
          onValueChange={value => {
            setAgentAction(value);
          }}
        />
      </div>
      <div style={{ display: showEngages }}>
        <MultiList
          style={{ padding: "10px" }}
          componentId="agentEngagesSensor"
          dataField="transactions.agentTransactionObjects.asWhom.keyword"
          sortBy="asc"
          showCheckbox
          react={{ and: sensorsList(props.sensors, "agentEngagesSensor") }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Engages"}
          URLParams={true}
          title="Engages"
        />
      </div>
      <div style={{ display: showWhatObject }}>
        <MultiList
          style={{ padding: "10px" }}
          componentId="agentWhatObjectSensor"
          dataField="transactions.agentTransactionObjects.asWhom.keyword"
          sortBy="asc"
          showCheckbox
          react={{ and: sensorsList(props.sensors, "agentEngagesSensor") }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Engages"}
          URLParams={true}
          title="Engages"
        />
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
      </div>
    </>
  );
}

function sensorsList(array, name) {
  array.splice(array.indexOf(name), 1);
  return array;
}

export default FacetTransactions;