import fetch from "isomorphic-fetch";

import Container from "../components/Layout/Container";
import AppHeader from "../components/Layout/Header";
import AppSider from "../components/Layout/Sider";
import AppContent from "../components/Layout/Content";
import AppFooter from "../components/Layout/Footer";
import ResultsGrid from "../components/Data/Resultsgrid";
import SearchBox from "../components/Data/Searchbox";
import DeedPane from "../components/Data/Deed";
import FacetYear from "../components/Data/Facetyear";
import FacetParties from "../components/Data/FacetParties";
import FacetCoParties from "../components/Data/FacetCoParties";
import FacetTransactions from "../components/Data/FacetTransactions";

import { Tabs, Collapse, Icon, Typography, Divider } from "antd";

const { TabPane } = Tabs;
const { Title } = Typography;

class Index extends React.Component {
  static async getInitialProps({ req }) {
    console.log(req);
    const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
    const res1 = await fetch(`${baseURL}/elasticapi/textfields`);
    const res2 = await fetch(`${baseURL}/elasticapi/numfields`);
    const res3 = await fetch(`${baseURL}/elasticapi/boolfields`);
    const map = await fetch(`${baseURL}/elasticapi/mapping`);

    const textFields = await res1.json();
    const numberFields = await res2.json();
    const booleanFields = await res3.json();
    const mapping = await map.json();

    return {
      textFields: textFields,
      numberFields: numberFields,
      booleanFields: booleanFields,
      mapping: mapping,
      sensors: [
        "searchSensor",
        "yearSensor",
        "agentSexSensor",
        "counterAgentSexSensor",
        "agentNameSensor",
        "counterAgentNameSensor",
        "agentGeogrStatusSensor",
        "counterAgentGeogrStatusSensor",
        "agentSocialStatusSensor",
        "counterAgentSocialStatusSensor",
        "coAgentSexSensor",
        "coAounterAgentSexSensor",
        "collectiveCoAgentsSensor",
        "collectiveCoCounterAgentsSensor",
        "agentActionSensor",
        "counterAgentActionSensor",
        "agentEngagesSensor",
        "agentWhatObjectSensor",
        "counterAgentWhatObjectSensor"
      ]
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

  handleClick(record) {
    this.add(record);
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

  render() {
    return (
      <Container>
        <AppHeader />

        <AppSider>
          <Icon type="filter" /> Filters
          <Divider orientation="left">Year</Divider>
          <FacetYear sensors={this.props.sensors} />
          <Divider orientation="left">Agent</Divider>
          <FacetParties sensors={this.props.sensors} party="agent" />
          <Divider orientation="left">Counter Agent</Divider>
          <FacetParties sensors={this.props.sensors} party="counterAgent" />
          <Divider orientation="left">Transactions</Divider>
          <FacetTransactions sensors={this.props.sensors} party="agent" />
          <FacetTransactions
            sensors={this.props.sensors}
            party="counterAgent"
          />
        </AppSider>

        <AppContent style={{ marginTop: "100px" }}>
          <Tabs
            hideAdd
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            <TabPane tab={"RESULTS"} key={0} closable={false}>
              <SearchBox
                textFields={this.props.textFields}
                numberFields={this.props.numberFields}
                booleanFields={this.props.booleanFields}
                sensors={this.props.sensors}
              />
              <ResultsGrid
                sensors={this.props.sensors}
                onClick={this.handleClick}
              />
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
