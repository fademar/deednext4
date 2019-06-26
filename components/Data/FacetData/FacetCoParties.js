import { Select, Divider } from "antd";
import { DataSearch, MultiList } from "@appbaseio/reactivesearch";

const { Option } = Select;

function FacetCoContractingParties(props) {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Agent</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId="AgentSexSensor"
          dataField="agentSex.keyword"
          size={10}
          sortBy="desc"
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "agentSexSensor")
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"Agent Sex"}
          URLParams={true}
          title="Sex"
        />
        <DataSearch
          style={{ padding: "10px" }}
          componentId="agentNameSensor"
          dataField={["agent.firstName", "agent.patronyme", "agent.lastName"]}
          queryFormat="and"
          placeholder={"Search for Agent Name"}
          autosuggest={true}
          react={{
            and: sensorsList(props.sensors, "agentNameSensor")
          }}
          filterLabel={"Agent Name"}
          URLParams={true}
          title="Name"
        />
        <MultiList
          style={{ padding: "10px" }}
          componentId="agentGeogrStatusSensor"
          dataField="agent.geogrStatus.keyword"
          showCheckbox
          showSearch={true}
          react={{
            and: sensorsList(props.sensors, "agentGeogrStatusSensor")
          }}
          showFilter
          showCount={true}
          filterLabel="Agent Geogr Status"
          URLParams={true}
          title="Geogr Status"
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Counter Agent</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId="counterAgentSexSensor"
          dataField="counterAgentSex.keyword"
          size={10}
          sortBy="desc"
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "counterAgentSexSensor")
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel="counterAgent Sex"
          URLParams={true}
          title="Sex"
        />
        <DataSearch
          style={{ padding: "10px" }}
          componentId="counterAgentNameSensor"
          dataField={[
            "counterAgent.firstName",
            "counterAgent.patronyme",
            "counterAgent.lastName"
          ]}
          queryFormat="and"
          placeholder={"Search for counterAgent Name"}
          autosuggest={true}
          react={{
            and: sensorsList(props.sensors, "counterAgentNameSensor")
          }}
          filterLabel="counterAgent Name"
          URLParams={true}
          title="Name"
        />
        <MultiList
          style={{ padding: "10px" }}
          componentId="counterAgentGeogrStatusSensor"
          dataField="counterAgent.geogrStatus.keyword"
          showCheckbox
          showSearch={true}
          react={{
            and: sensorsList(props.sensors, "counterAgentGeogrStatusSensor")
          }}
          showFilter
          showCount={true}
          filterLabel="counterAgent Geogr Status"
          URLParams={true}
          title="Geogr Status"
        />
      </div>
    </>
  );
}

function sensorsList(array, name) {
  array.splice(array.indexOf(name), 1);
  return array;
}

export default FacetCoContractingParties;
