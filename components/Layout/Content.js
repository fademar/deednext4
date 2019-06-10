import { Layout } from "antd";

const { Content } = Layout;

function AppContent(props) {
  return (
    <Content style={{ padding: "0 0 50px 200px", marginTop: 100 }}>
      {props.children}
    </Content>
  );
}

export default AppContent;
