import fetch from "isomorphic-fetch";

import Container from "../components/Layout/Container";
import AppHeader from "../components/Layout/Header";
import AppSider from "../components/Layout/Sider";
import AppContent from "../components/Layout/Content";
import AppFooter from "../components/Layout/Footer";
import ResultsGrid from "../components/Data/Resultsgrid";
import SearchBox from "../components/Data/Searchbox";
import FacetBox from "../components/Data/Facetbox";
import DeedPane from "../components/Data/Deed";

import { Tabs } from "antd";

const { TabPane } = Tabs;

class Index extends React.Component {
  static async getInitialProps({ req }) {
    const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
    const res = await fetch(`${baseURL}/elasticapi/fields`);

    return {
      fields: await res.json(),
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
          <FacetBox sensors={this.props.sensors} />
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
                fields={this.props.fields}
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
