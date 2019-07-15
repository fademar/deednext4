import { Select, Divider } from "antd";
import {
  DataSearch,
  MultiList,
  MultiDropdownList
} from "@appbaseio/reactivesearch";

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
            and: props.sensors
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
            and: props.sensors
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
            and: props.sensors
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
            and: props.sensors
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

export default FacetContractingParties;
