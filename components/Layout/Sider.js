import { Layout } from "antd";

const { Sider } = Layout;

function AppSider(props) {
  return (
    <Sider
      width={200}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 64,
        background: "#fff"
      }}
    >
      {props.children}
    </Sider>
  );
}

export default AppSider;
