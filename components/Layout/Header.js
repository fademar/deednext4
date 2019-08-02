import { Layout, Menu } from "antd";

const { Header } = Layout;

function AppHeader() {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        marginBottom: "40px"
      }}
    >
      <div className="logo">Russian Deeds Database</div>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        {/* <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
      </Menu>
      <style jsx>{`
        .logo {
          color: #ffffff;
          font-size: 1.1em;
          float: left;
        }
      `}</style>
    </Header>
  );
}

export default AppHeader;
