import { Layout } from "antd";
import { ReactiveBase } from "@appbaseio/reactivesearch";

function AppLayout(props) {
  return (
    <Layout className="layout" style={{ height: "100vh" }}>
      <ReactiveBase app="deeds" url="http://localhost:9200">
        {props.children}
      </ReactiveBase>
    </Layout>
  );
}

export default AppLayout;
