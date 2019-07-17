import { Select, Divider } from "antd";
import {
  DataSearch,
  MultiList,
  MultiDataList
} from "@appbaseio/reactivesearch";

const { Option } = Select;

const FacetCoContractingParties = props => {
  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };
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
            and: newArray(
              props.sensors,
              props.sensors.indexOf("coAgentSexSensor")
            )
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={"co-Agent Sex"}
          URLParams={true}
          title="Sex"
        />
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
            and: newArray(
              props.sensors,
              props.sensors.indexOf("coAounterAgentSexSensor")
            )
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel="co-CounterAgent Sex"
          URLParams={true}
          title="Sex"
        />
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
            and: newArray(
              props.sensors,
              props.sensors.indexOf("collectiveCoAgentsSensor")
            )
          }}
          showSearch={true}
          showFilter
          showCount={true}
          filterLabel="collective Co-Agents Relation to Agent"
          URLParams={true}
          title="Relation to Agent"
        />
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
            and: newArray(
              props.sensors,
              props.sensors.indexOf("collectiveCoCounterAgentsSensor")
            )
          }}
          showSearch={true}
          showFilter
          showCount={true}
          filterLabel="collective Co-Counter Agents Relation to CounterAgent"
          URLParams={true}
          title="Relation to CounterAgent"
        />
      </div>
    </>
  );
};

export default FacetCoContractingParties;
