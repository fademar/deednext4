import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import {
  DataSearch,
  MultiList,
  MultiDataList,
  MultiDropdownList
} from "@appbaseio/reactivesearch";

function FacetTransactions(props) {
  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };
  const [action, setAction] = useState([]);
  const [showEngages, setShowEngages] = useState("none");
  const [showWhatObject, setShowWhatObject] = useState("none");

  const whatObject = [
    { label: "chattels", value: "chattels" },
    { label: "debt", value: "debt" },
    { label: "dependent", value: "dependent" },
    { label: "forfeit", value: "forfeit" },
    { label: "fugitive souls", value: "fugitive souls" },
    { label: "goods", value: "goods" },
    { label: "immovable property", value: "immovableProperty" },
    { label: "money", value: "money" },
    { label: "parent", value: "parent" },
    { label: "responsibilities", value: "responsibilities" },
    { label: "share from estate", value: "share from estate" },
    { label: "souls", value: "souls" }
  ];

  useEffect(() => {
    action.indexOf("engages") >= 0
      ? setShowEngages("block")
      : setShowEngages("none");
    action.indexOf("cedes") >= 0 ||
    action.indexOf("exchanges") >= 0 ||
    action.indexOf("mortgages") >= 0 ||
    action.indexOf("puts to rent") >= 0 ||
    action.indexOf("sells") >= 0 ||
    action.indexOf("bequeaths") >= 0 ||
    action.indexOf("lends") >= 0 ||
    action.indexOf("pays") >= 0
      ? setShowWhatObject("block")
      : setShowWhatObject("none");
  }, [action]);

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">{props.party}</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId={props.party + "ActionSensor"}
          dataField={"transactions." + props.party + "Action.keyword"}
          sortBy="asc"
          showCheckbox
          react={{
            and: newArray(
              props.sensors,
              props.sensors.indexOf(props.party + "ActionSensor")
            )
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={props.party + " Action"}
          URLParams={false}
          title="Action"
          onValueChange={value => {
            setAction(value);
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
          react={{
            and: newArray(
              props.sensors,
              props.sensors.indexOf("agentEngagesSensor")
            )
          }}
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
          componentId={props.party + "WhatObjectSensor"}
          dataField={
            "transactions." + props.party + "TransactionObjects.object.keyword"
          }
          sortBy="asc"
          showCheckbox
          react={{
            and: newArray(
              props.sensors,
              props.sensors.indexOf(props.party + "WhatObjectSensor")
            )
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Object"}
          URLParams={true}
          title="Object"
        />
      </div>
    </>
  );
}

export default FacetTransactions;
