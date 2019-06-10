import { Layout, Menu, Icon, Table } from "antd";
import fetch from "isomorphic-fetch";

import Container from "../components/Layout/Container";
import Header from "../components/Layout/Header";
import Sider from "../components/Layout/Sider";
import Content from "../components/Layout/Content";
import Footer from "../components/Layout/Footer";

import {
  DataSearch,
  ReactiveList,
  MultiList,
  SelectedFilters
} from "@appbaseio/reactivesearch";

const { SubMenu } = Menu;

const columns = [
  {
    title: "Deed Code",
    dataIndex: "deedCode",
    key: "deedCode"
  },
  {
    title: "Deed Reference",
    dataIndex: "deedRef",
    key: "deedRef"
  },
  {
    title: "Deed Date",
    dataIndex: "deedDate",
    key: "deedDate"
  },
  {
    title: "Deed Name",
    dataIndex: "deedName",
    key: "deedName"
  },
  {
    title: "Complete",
    dataIndex: "complete",
    key: "complete"
  }
];

function Index(props) {
  return (
    <Container>
      <Header />
      <Layout>
        <Sider>
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
              <MultiList
                style={{ padding: "10px" }}
                componentId="yearList"
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
                    "agentSexList, counterAgentSexlist",
                    "agentNameSensor"
                  ]
                }}
                showFilter
                showCount={true}
                filterLabel="Year"
                URLParams={false}
              />
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
              <Menu.ItemGroup key="agentSexList" title="Agent Sex">
                <MultiList
                  style={{ padding: "10px" }}
                  componentId="agentSexList"
                  dataField="agentSex.keyword"
                  size={10}
                  sortBy="desc"
                  queryFormat="or"
                  showCheckbox
                  react={{
                    and: [
                      "searchSensor",
                      "yearList",
                      "counterAgentSexlist",
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
                  dataField={[
                    "agent.firstName",
                    "agent.patronyme",
                    "agent.lastName"
                  ]}
                  queryFormat="and"
                  autosuggest={true}
                  filterLabel="search"
                  URLParams={true}
                />
              </Menu.ItemGroup>
            </SubMenu>
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
                componentId="counterAgentSexlist"
                dataField="counterAgentSex.keyword"
                size={10}
                sortBy="desc"
                queryFormat="or"
                showCheckbox
                react={{
                  and: [
                    "searchSensor",
                    "yearList",
                    "agentSexList",
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
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content style={{ marginTop: "100px" }}>
            <DataSearch
              componentId="SearchSensor"
              dataField={["deedName"]}
              queryFormat="and"
              autosuggest={true}
              filterLabel="search"
              URLParams={true}
            />
            <SelectedFilters
              showClearAll={true}
              clearAllLabel="Clear filters"
            />
            <ReactiveList
              componentId="results"
              dataField="deedName"
              react={{
                and: [
                  "searchSensor",
                  "yearList",
                  "agentSexList",
                  "counterAgentSexlist",
                  "agentNameSensor"
                ]
              }}
              pagination
              paginationAt="bottom"
              pages={5}
              Loader="Loading..."
              noResults="No results were found..."
              render={({ loading, error, data }) => {
                if (loading) {
                  return <div>Fetching Results.</div>;
                }
                if (error) {
                  return (
                    <div>
                      Something went wrong! Error details{" "}
                      {JSON.stringify(error)}
                    </div>
                  );
                }
                return (
                  <Table
                    style={{ background: "#ffffff" }}
                    rowKey={record => record.mongo_id}
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                  />
                );
              }}
            />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Container>
  );
}

Index.getInitialProps = async ({ req }) => {
  const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
  const res = await fetch(`${baseURL}/elasticapi/fields`);

  return {
    fields: await res.json()
  };
};

export default Index;
