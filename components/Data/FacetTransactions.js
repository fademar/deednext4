import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import {
  DataSearch,
  MultiList,
  MultiDataList,
  MultiDropdownList
} from "@appbaseio/reactivesearch";

function FacetTransactions(props) {
  const [agentAction, setAgentAction] = useState([]);
  const [counterAgentAction, setCounterAgentAction] = useState([]);
  const [showEngages, setShowEngages] = useState("none");
  const [showWhatObject, setShowWhatObject] = useState("none");

  const whatObject = [
    { label: "chattels", value: "chattels" },
    { label: "debt", value: "debt" },
    { label: "dependent", value: "dependent" },
    { label: "forfeit", value: "forfeit" },
    { label: "fugitive souls", value: "fugitive souls" },
    { label: "goods", value: "goods" },
    { label: "immovable property", value: "immovable property" },
    { label: "money", value: "money" },
    { label: "parent", value: "parent" },
    { label: "responsibilities", value: "responsibilities" },
    { label: "share from estate", value: "share from estate" },
    { label: "souls", value: "souls" }
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
            and: props.sensors
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
          react={{ and: props.sensors }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Engages"}
          URLParams={true}
          title="Engages"
        />
      </div>
      <div style={{ display: showWhatObject }}>
        <MultiDataList
          style={{ padding: "10px" }}
          componentId="agentWhatObjectSensor"
          data={whatObject}
          dataField="transactions.agentTransactionObjects.object.keyword"
          sortBy="asc"
          showCheckbox
          react={{ and: props.sensors }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Object"}
          URLParams={true}
          title="Object"
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
            and: props.sensors
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

export default FacetTransactions;
