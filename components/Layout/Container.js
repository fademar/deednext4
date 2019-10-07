import { Layout } from "antd";
import { ReactiveBase } from "@appbaseio/reactivesearch";

function AppLayout(props) {
  return (
    <Layout className="layout" style={{ height: "100vh", overflow: "auto" }}>
      <ReactiveBase app="deeds" url="http://neo041:8080">
        {props.children}
      </ReactiveBase>
    </Layout>
  );
}

export default AppLayout;
