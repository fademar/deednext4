import { Layout } from "antd";

const { Content } = Layout;

function AppContent(props) {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content style={{ padding: 10, marginTop: 70 }}>{props.children}</Content>
    </Layout>
  );
}

export default AppContent;
