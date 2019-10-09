import fetch from "isomorphic-fetch";
import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import * as _ from "lodash";

import Container from "../components/Layout/Container";
import AppHeader from "../components/Layout/Header";
import AppSider from "../components/Layout/Sider";
import AppContent from "../components/Layout/Content";
import AppFooter from "../components/Layout/Footer";
import ResultsGrid from "../components/Data/Resultsgrid";
import DeedPane from "../components/Data/Deed";
import FacetYear from "../components/Data/Facetyear";
import FacetParties from "../components/Data/FacetParties";
import FacetCoParties from "../components/Data/FacetCoParties";
import FacetTransactions from "../components/Data/FacetTransactions";
import FacetBox from "../components/Data/Facetbox";
import NumericBox from "../components/Data/Numericbox";
import BooleanBox from "../components/Data/Booleanbox";

import { Tabs, Button, Typography, Row, Col, Card, Icon } from "antd";

const { TabPane } = Tabs;

class Index extends React.Component {
  static async getInitialProps({ req }) {
    const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
    const res1 = await fetch(`${baseURL}/elasticapi/textfields`);
    const res2 = await fetch(`${baseURL}/elasticapi/numfields`);
    const res3 = await fetch(`${baseURL}/elasticapi/boolfields`);
    const map = await fetch(`${baseURL}/elasticapi/mapping`);

    const textFields = await res1.json();
    const numberFields = await res2.json();
    const booleanFields = await res3.json();
    const mapping = await map.json();

    const sensors = _.concat(
      textFields,
      numberFields,
      booleanFields,
      "fullsearch"
    );

    return {
      textFields: textFields,
      numberFields: numberFields,
      booleanFields: booleanFields,
      mapping: mapping,
      sensors: sensors
    };
  }
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [];
    this.state = {
      activeKey: "0",
      panes
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, record) {
    if (record) {
      this.add(record);
    } else {
      if (event.target.id === "clearAll") {
        this.setState({ activeKey: "0", panes: [] });
      }
    }
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = record => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "#" + record._id,
      content: record,
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  fullQuery = value => {
    return {
      query: {
        multi_match: {
          query: value,
          zero_terms_query: "all",
          type: "cross_fields"
        }
      }
    };
  };

  render() {
    return (
      <Container>
        <AppHeader />
        <AppContent style={{ marginTop: "100px" }}>
          <Tabs
            hideAdd
            style={{ height: "500vh" }}
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
            tabBarExtraContent={
              <Button
                type="primary"
                icon="delete"
                onClick={this.handleClick}
                id="clearAll"
              >
                clear all tabs
              </Button>
            }
          >
            <TabPane tab={"SEARCH"} key={0} closable={false}>
              <Row style={{ margin: "30px 0" }}>
                <Col span={24}>
                  <Card title="FULL-TEXT search">
                    <DataSearch
                      componentId="fullsearch"
                      dataField={this.props.textFields}
                      queryFormat="and"
                      autosuggest={true}
                      filterLabel="search"
                      placeholder="Full-Text Search : search for any term anywhere..."
                      URLParams={false}
                      customQuery={this.fullQuery}
                      debounce={300}
                      react={{
                        and: this.props.textFields
                      }}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col span={10}>
                  <Card title="Search in TEXT FIELDS">
                    <FacetBox
                      style={{ marginBottom: "20px" }}
                      textFields={this.props.textFields}
                    />
                  </Card>
                </Col>
                <Col span={7}>
                  <Card title="Search in NUMERIC FIELDS">
                    {/* <NumericBox
                      style={{ marginBottom: "20px" }}
                      numberFields={this.props.numberFields}
                    /> */}
                  </Card>
                </Col>
                <Col span={7}>
                  <Card title="Search in BOOLEAN FIELDS">
                    {/* <BooleanBox
                      style={{ marginBottom: "20px" }}
                      booleanFields={this.props.booleanFields}
                    /> */}
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginTop: "30px" }}>
                <Col span={24}>
                  <SelectedFilters
                    showClearAll={true}
                    clearAllLabel="Clear filters"
                  />
                  <ResultsGrid
                    sensors={this.props.sensors}
                    onClick={this.handleClick}
                  />
                </Col>
              </Row>
            </TabPane>
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={true}>
                <DeedPane content={pane.content} />
              </TabPane>
            ))}
          </Tabs>
        </AppContent>
      </Container>
    );
  }
}

export default Index;
