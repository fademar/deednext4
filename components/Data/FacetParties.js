import { Select, Divider } from "antd";
import {
  DataSearch,
  MultiList,
  MultiDropdownList
} from "@appbaseio/reactivesearch";

const { Option } = Select;

function FacetContractingParties(props) {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <Divider orientation="left">{props.party}</Divider>
        <MultiList
          style={{ padding: "10px" }}
          componentId={props.party + "SexSensor"}
          dataField={props.party + "Sex.keyword"}
          size={10}
          sortBy="desc"
          showCheckbox
          react={{
            and: sensorsList(props.sensors, props.party + "SexSensor")
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel={props.party + " Sex"}
          URLParams={false}
          title="Sex"
        />
        <DataSearch
          style={{ padding: "10px" }}
          componentId={props.party + "NameSensor"}
          dataField={[
            props.party + ".firstName",
            props.party + ".patronyme",
            props.party + ".lastName"
          ]}
          queryFormat="and"
          placeholder={"Search for " + props.party + " name"}
          autosuggest={true}
          react={{
            and: sensorsList(props.sensors, props.party + "NameSensor")
          }}
          filterLabel={props.party + " name"}
          URLParams={false}
          title="Name"
        />
        <DataSearch
          style={{ padding: "10px" }}
          componentId={props.party + "SocialStatusSensor"}
          dataField={[props.party + ".socialStatus"]}
          queryFormat="and"
          placeholder={"Search for " + props.party + " social status"}
          autosuggest={true}
          react={{
            and: sensorsList(props.sensors, props.party + "SocialStatusSensor")
          }}
          filterLabel={props.party + " social status"}
          URLParams={false}
          title="Social Status"
        />
        <MultiList
          style={{ padding: "10px" }}
          componentId={props.party + "GeogrStatusSensor"}
          dataField={props.party + ".geogrStatus.keyword"}
          showCheckbox
          showSearch={true}
          react={{
            and: sensorsList(props.sensors, props.party + "GeogrStatusSensor")
          }}
          placeholder={"Search for " + props.party + " geogr status"}
          showFilter
          showCount={true}
          filterLabel={props.party + " geogr status"}
          URLParams={false}
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

export default FacetContractingParties;