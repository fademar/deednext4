import fetch from "isomorphic-fetch";
import ndjsonStream from "can-ndjson-stream";

import { PageHeader } from "antd";

import Container from "../components/Layout/Container";
import AppHeader from "../components/Layout/Header";
import AppSider from "../components/Layout/Sider";
import AppContent from "../components/Layout/Content";
import AppFooter from "../components/Layout/Footer";
import ResultsGrid from "../components/Data/Resultsgrid";
import SearchBox from "../components/Data/Searchbox";
import FacetBox from "../components/Data/Facetbox";

function Index(props) {
  return (
    <Container>
      <AppHeader />
      <AppSider>
        <FacetBox sensors={props.sensors} />
      </AppSider>

      <AppContent style={{ marginTop: "100px" }}>
        <SearchBox fields={props.fields} sensors={props.sensors} />
        <ResultsGrid sensors={props.sensors} />
      </AppContent>
    </Container>
  );
}

Index.getInitialProps = async ({ req }) => {
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
};

export default Index;
