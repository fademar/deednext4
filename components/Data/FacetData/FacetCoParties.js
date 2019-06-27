import { Select, Divider } from "antd";
import {
  DataSearch,
  MultiList,
  MultiDataList
} from "@appbaseio/reactivesearch";

const { Option } = Select;

function FacetCoContractingParties(props) {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Co-Agents</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId="coAgentSexSensor"
          dataField="coAgents.coAgentSex.keyword"
          size={10}
          sortBy="desc"
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "coAgentSexSensor")
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"co-Agent Sex"}
          URLParams={true}
          title="Sex"
        />
        {/* <DataSearch
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
        /> */}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Co-Counter Agents</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId="coAounterAgentSexSensor"
          dataField="coCounterAgents.coCounterAgentSex.keyword"
          size={10}
          sortBy="desc"
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "coAounterAgentSexSensor")
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel="co-CounterAgent Sex"
          URLParams={true}
          title="Sex"
        />
        {/* <DataSearch
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
        /> */}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Collective Co-Agents</Divider>
        <MultiDataList
          style={{ padding: "10px" }}
          componentId="collectiveCoAgentsSensor"
          dataField="collectiveCoAgent.relationToAgent.keyword"
          data={[
            {
              label: "Parents",
              value: "parents"
            },
            {
              label: "Corporation Members",
              value: "corporation members"
            },
            {
              label: "Companions",
              value: "companions"
            },
            {
              label: "Other",
              value: "other"
            }
          ]}
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "collectiveCoAgentsSensor")
          }}
          showSearch={true}
          showFilter
          showCount={true}
          filterLabel="collective Co-Agents Relation to Agent"
          URLParams={true}
          title="Relation to Agent"
        />
        {/* <DataSearch
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
        /> */}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">Collective Co-Counter Agents</Divider>
        <MultiDataList
          style={{ padding: "10px" }}
          componentId="collectiveCoCounterAgentsSensor"
          dataField="collectiveCoCounterAgent.relationToCounterAgent.keyword"
          data={[
            {
              label: "Parents",
              value: "parents"
            },
            {
              label: "Corporation Members",
              value: "corporation members"
            },
            {
              label: "Companions",
              value: "companions"
            },
            {
              label: "Other",
              value: "other"
            }
          ]}
          showCheckbox
          react={{
            and: sensorsList(props.sensors, "collectiveCoCounterAgentsSensor")
          }}
          showSearch={true}
          showFilter
          showCount={true}
          filterLabel="collective Co-Counter Agents Relation to CounterAgent"
          URLParams={true}
          title="Relation to CounterAgent"
        />
        {/* <DataSearch
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
        /> */}
      </div>
    </>
  );
}

function sensorsList(array, name) {
  array.splice(array.indexOf(name), 1);
  return array;
}

export default FacetCoContractingParties;
