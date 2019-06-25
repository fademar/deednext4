import { Menu } from "antd";
import { DataSearch, MultiList } from "@appbaseio/reactivesearch";

function FacetAgent(props) {
  return (
    <>
      <MultiList
        style={{ padding: "10px" }}
        componentId="agentSexSensor"
        dataField="agentSex.keyword"
        size={10}
        sortBy="desc"
        queryFormat="or"
        showCheckbox
        react={{
          and: props.sensors
        }}
        showSearch={false}
        showFilter
        showCount={true}
        filterLabel="Agent Sex"
        URLParams={true}
      />
      <DataSearch
        style={{ padding: "10px" }}
        componentId="agentNameSensor"
        dataField={["agent.firstName", "agent.patronyme", "agent.lastName"]}
        queryFormat="and"
        autosuggest={true}
        react={{
          and: props.sensors
        }}
        filterLabel="Agent Name"
        URLParams={true}
      />
    </>
  );
}

export default FacetAgent;
