import { Menu, Icon } from "antd";
import { DataSearch, MultiList } from "@appbaseio/reactivesearch";

const { SubMenu } = Menu;

function FacetBox() {
  return (
    <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
      {/* Facet for searching by Year */}
      <SubMenu
        key="year"
        title={
          <span>
            <Icon type="calendar" />
            Year
          </span>
        }
      >
        <MultiList
          style={{ padding: "10px" }}
          componentId="yearSensor"
          dataField="deedDate.year.keyword"
          size={20}
          sortBy="desc"
          queryFormat="or"
          showCheckbox
          showSearch
          placeholder="Search for a Year"
          react={{
            and: [
              "searchSensor",
              "agentSexSensor",
              "counterAgentSexSensor",
              "agentNameSensor"
            ]
          }}
          showFilter
          showCount={true}
          filterLabel="Year"
          URLParams={false}
        />
      </SubMenu>

      {/* Facet for Agent searching */}
      <SubMenu
        key="agent"
        title={
          <span>
            <Icon type="user" />
            Agent
          </span>
        }
      >
        <Menu.ItemGroup key="agentSexList" title="Agent Sex">
          <MultiList
            style={{ padding: "10px" }}
            componentId="agentSexSensor"
            dataField="agentSex.keyword"
            size={10}
            sortBy="desc"
            queryFormat="or"
            showCheckbox
            react={{
              and: [
                "searchSensor",
                "yearSensor",
                "counterAgentSexSensor",
                "agentNameSensor"
              ]
            }}
            showSearch={false}
            showFilter
            showCount={true}
            filterLabel="Agent"
            URLParams={false}
          />
        </Menu.ItemGroup>
        <Menu.ItemGroup key="agentName" title="Agent Name">
          <DataSearch
            style={{ padding: "10px" }}
            componentId="agentNameSensor"
            dataField={["agent.firstName", "agent.patronyme", "agent.lastName"]}
            queryFormat="and"
            autosuggest={true}
            filterLabel="search"
            react={{
              and: [
                "searchSensor",
                "yearSensor",
                "agentSexSensor",
                "counterAgentSexSensor"
              ]
            }}
            URLParams={true}
          />
        </Menu.ItemGroup>
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
