import { Layout } from "antd";
import { ReactiveBase } from "@appbaseio/reactivesearch";

function AppLayout(props) {
  return (
    <Layout className="layout" style={{ height: "100vh", overflow: "auto" }}>
      <ReactiveBase
        app="deeds"
        credentials="deeds-cercec-1423:DcI3Hy9rejHq-ZZNYz93"
        url="http://deeds-cercec-1423.elasticsearch.dbs.scalingo.com:30210"
      >
        {props.children}
      </ReactiveBase>
    </Layout>
  );
}

export default AppLayout;
