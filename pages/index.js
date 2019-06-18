import { Layout } from "antd";
import fetch from "isomorphic-fetch";

import Container from "../components/Layout/Container";
import Header from "../components/Layout/Header";
import Sider from "../components/Layout/Sider";
import Content from "../components/Layout/Content";
import Footer from "../components/Layout/Footer";
import ResultsGrid from "../components/Data/Resultsgrid";
import SearchBox from "../components/Data/Searchbox";
import FacetBox from "../components/Data/Facetbox";

function Index(props) {
  return (
    <Container>
      <Header />
      <Layout>
        <Sider>
          <FacetBox />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content style={{ marginTop: "100px" }}>
            <SearchBox />
            <ResultsGrid />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Container>
  );
}

Index.getInitialProps = async ({ req }) => {
  const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
  const res = await fetch(`${baseURL}/elasticapi/fields`);

  return {
    fields: await res.json()
  };
};

export default Index;
