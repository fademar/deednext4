import { Collapse, Icon } from "antd";

import FacetYear from "./FacetData/Facetyear";
import FacetContractingParties from "./FacetData/FacetParties";
import FacetCoContractingParties from "./FacetData/FacetCoParties";
import FacetTransactions from "./FacetData/FacetTransactions";

const { Panel } = Collapse;

function FacetBox(props) {
  return (
    <Collapse bordered={false}>
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
        <FacetTransactions sensors={props.sensors} />
      </Panel>
    </Collapse>
  );
}

export default FacetBox;
