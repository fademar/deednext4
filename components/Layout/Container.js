import { Layout } from "antd";
import { ReactiveBase } from "@appbaseio/reactivesearch";

function AppLayout(props) {
  return (
    <Layout className="layout" style={{ height: "100vh", overflow: "auto" }}>
      <ReactiveBase app="deeds" url="http://192.168.44.41:8080/deeds">
        {props.children}
      </ReactiveBase>
    </Layout>
  );
}

export default AppLayout;
