import { Menu, Icon } from "antd";
import { DataSearch, MultiList } from "@appbaseio/reactivesearch";

import FacetYear from "./FacetData/Facetyear";
import FacetAgent from "./FacetData/Facetagent";

const { SubMenu } = Menu;

function FacetBox(props) {
  return (
    <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
      <SubMenu
        key="year"
        title={
          <span>
            <Icon type="calendar" />
            Year
          </span>
        }
      >
        <FacetYear sensors={props.sensors} />
      </SubMenu>
      <SubMenu
        key="agent"
        title={
          <span>
            <Icon type="user" />
            Agent
          </span>
        }
      >
        <FacetAgent sensors={props.sensors} />
      </SubMenu>
      {/* Facet for Counter Agent search */}
      <SubMenu
        key="counterAgent"
        title={
          <span>
            <Icon type="user-add" />
            Counter Agent
          </span>
        }
      >
        <MultiList
          style={{ padding: "10px" }}
          componentId="counterAgentSexSensor"
          dataField="counterAgentSex.keyword"
          size={10}
          sortBy="desc"
          queryFormat="or"
          showCheckbox
          react={{
            and: [
              "searchSensor",
              "yearSensor",
              "agentSexSensor",
              "agentNameSensor"
            ]
          }}
          showSearch={false}
          showFilter
          showCount={true}
          filterLabel="Counter Agent"
          URLParams={false}
        />
      </SubMenu>
    </Menu>
  );
}

export default FacetBox;
