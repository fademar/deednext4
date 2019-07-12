import fetch from "isomorphic-fetch";
import ndjsonStream from "can-ndjson-stream";

import { PageHeader } from "antd";

import Container from "../components/Layout/Container";
import AppHeader from "../components/Layout/Header";
import AppSider from "../components/Layout/Sider";
import AppContent from "../components/Layout/Content";

function ApiTools(props) {
  return (
    <Container>
      <AppHeader />

      <AppContent style={{ marginTop: "100px" }} />
    </Container>
  );
}

export default ApiTools;
