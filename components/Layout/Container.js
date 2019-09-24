import { Layout } from "antd";
import { ReactiveBase } from "@appbaseio/reactivesearch";

function AppLayout(props) {
  return (
    <Layout className="layout" style={{ height: "100vh", overflow: "auto" }}>
      <ReactiveBase
        app="deeds"
        url="https://69f339ab25104c2482893acf7239cd0c.europe-west1.gcp.cloud.es.io:9243"
      >
        {props.children}
      </ReactiveBase>
    </Layout>
  );
}

export default AppLayout;
