import { Layout } from "antd";

const { Sider } = Layout;

function AppSider(props) {
  return (
    <Layout>
      <Sider
        width={400}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          paddingTop: 64,
          background: "#fff"
        }}
      >
        {props.children}
      </Sider>
    </Layout>
  );
}

export default AppSider;