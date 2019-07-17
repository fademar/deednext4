import { Collapse, Icon, Divider } from "antd";

import FacetYear from "./Facetyear";
import FacetContractingParties from "./FacetParties";
import FacetCoContractingParties from "./FacetCoParties";
import FacetTransactions from "./FacetTransactions";

const { Panel } = Collapse;

const FacetBox = props => {
  return (
    <>
      <Divider orientation="left">Search by...</Divider>
      <Collapse bordered={false} style={{ background: "#f0f2f5" }}>
        <Panel header="Year" key="YearPanel">
          <FacetYear sensors={props.sensors} />
        </Panel>
        <Panel header="Contracting Parties" key="ContractingPartiesPanel">
          <FacetContractingParties sensors={props.sensors} party={"agent"} />
          <FacetContractingParties
            sensors={props.sensors}
            party={"counterAgent"}
          />
        </Panel>
        <Panel header="Co-Contracting Parties" key="CoContractingPartiesPanel">
          <FacetCoContractingParties sensors={props.sensors} />
        </Panel>
        <Panel header="Transactions" key="TransactionsPanel">
          <FacetTransactions sensors={props.sensors} party={"agent"} />
          <FacetTransactions sensors={props.sensors} party={"counterAgent"} />
        </Panel>
      </Collapse>
    </>
  );
};

export default FacetBox;
