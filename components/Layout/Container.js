import { Layout } from "antd";
import { ReactiveBase } from "@appbaseio/reactivesearch";

function AppLayout(props) {
  return (
    <Layout className="layout" style={{ height: "100vh", overflow: "auto" }}>
      <ReactiveBase
        app="deeds"
        // credentials="deeds-cercec-1423:DcI3Hy9rejHq-ZZNYz93"
        url="http://localhost:9200"
      >
        {props.children}
      </ReactiveBase>
    </Layout>
  );
}

export default AppLayout;
