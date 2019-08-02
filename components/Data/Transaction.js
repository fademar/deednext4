import { Typography, Divider, Col, Row, Tag } from "antd";

const { Text } = Typography;

const Transaction = props => {
  return (
      <>
    <Row gutter={16} key={props.indexTransaction + "row"}>
        <Col span={12} key={props.indexTransaction + "col-1"}>
              
      <Text type="secondary" key={props.indexTransaction + "agentAction"}>
        Agent Action:
      </Text>{" "}
      {props.data.agentAction}
      <br />
      {props.data.agentTransactionObjects.map((item, index) => (
        <>
          <Text type="secondary" key={props.indexTransaction + "agentObjectOfTransaction-" + index}>
            Object of transaction:{" "}
          </Text>
          {item.object[0]}
          <br />
          {(() => {
            switch (item.object[0]) {
              case "immovableProperty":
                return (
                  <>
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.type"}
                    >
                      Type:
                    </Text>{" "}
                    {item.immovableProperty.type}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.share"}
                    >
                      Share:
                    </Text>{" "}
                    {item.immovableProperty.share}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.origin"}
                    >
                      Origin:
                    </Text>{" "}
                    {item.immovableProperty.origin}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.localisation"}
                    >
                      Localisation:
                    </Text>{" "}
                    {item.immovableProperty.localisation}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.neighbours"}
                    >
                      Neighbours:
                    </Text>{" "}
                    {item.immovableProperty.neighbours}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.surface-chetiVpole"}
                    >
                      Surface-chetiVpole:
                    </Text>{" "}
                    {item.immovableProperty.surface.chetiVpole}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.surface-sazheni-X"}
                    >
                      Surface-sazheni-X:
                    </Text>{" "}
                    {item.immovableProperty.surface.sazheni.x}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.surface-sazheni-Y"}
                    >
                      Surface-sazheni-Y:
                    </Text>{" "}
                    {item.immovableProperty.surface.sazheni.y}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population-male"}
                    >
                      Population-male:
                    </Text>{" "}
                    {item.immovableProperty.population.male}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population-female"}
                    >
                      Population-female:
                    </Text>{" "}
                    {item.immovableProperty.population.female}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population.operator"}
                    >
                      Population-operator:
                    </Text>{" "}
                    {item.immovableProperty.population.operator}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population.households"}
                    >
                      Population-households:
                    </Text>{" "}
                    {item.immovableProperty.population.households}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.buildings"}
                    >
                      Buildings:
                    </Text>{" "}
                    {item.immovableProperty.buildings}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.appurtenances"}
                    >
                      Appurtenances:
                    </Text>{" "}
                    {item.immovableProperty.population.appurtenances}
                        <br />
                        
                  </>
                );
              case "money":
                return item.money.map((o, i) => (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "money-" + i + ".coin"}>
                      Coin:
                    </Text>{" "}
                    {o.coins}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "money-" + i + ".rubli"}
                    >
                      Rubli:
                    </Text>{" "}
                    {o.rubli}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "money-" + i + ".altyny"}
                    >
                      Altyny:
                    </Text>{" "}
                    {o.altyny}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "money-" + i + ".dengi"}
                    >
                      Dengi:
                    </Text>{" "}
                    {o.dengi}
                    <br />
                  </>
                ));
              case "forfeit":
                return item.forfeit.map((o, i) => (
                  <>
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".coin"}
                    >
                      Coin:
                    </Text>{" "}
                    {o.coins}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".rubli"}
                    >
                      Rubli:
                    </Text>{" "}
                    {o.rubli}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".altyny"}
                    >
                      Altyny:
                    </Text>{" "}
                    {o.altyny}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".dengi"}
                    >
                      Dengi:
                    </Text>{" "}
                    {o.dengi}
                    <br />
                  </>
                ));
              case "chattels":
                return (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.type"}>
                      Type:
                    </Text>{" "}
                    {item.chattels.type}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.origin"}>
                      Origin:
                    </Text>{" "}
                    {item.chattels.origin}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.description"}>
                      Description:
                    </Text>{" "}
                    {item.chattels.description}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.price"}>
                      Price:
                    </Text>{" "}
                    {item.chattels.price}
                  </>
                );
              case "debt":
                return (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "debt.debtorName"}>
                      Debtor Name:
                    </Text>{" "}
                    {item.debt.debtorName}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "debt.debtDate"}>
                      Debt Date:
                    </Text>{" "}
                    {item.debt.debtDate}
                    <br />
                    {item.debt.amount.map((a, i) => (
                      <>
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".coins"}
                        >
                          Amount / Coins:
                        </Text>{" "}
                        {a.coins}{" "}
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".rubli"}
                        >
                           Rubli:
                        </Text>{" "}
                        {a.rubli}{" "}
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".altyny"}
                        >
                          Altyny:
                        </Text>{" "}
                        {a.altyny}{" "}
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".dengi"}
                        >
                          Dengi:
                        </Text>{" "}
                        {a.dengi}{" "}
                      </>
                    ))}
                  </>
                );
              case "fugitiveSouls":
                return (
                  <>
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.juridicalStatus"}
                    >
                      Juridical Status:
                    </Text>{" "}
                    {item.fugitiveSouls.juridicalStatus}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.numberOfSouls.male"}
                    >
                      Number Of Souls / Male:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.numberOfSouls.female"}
                    >
                      Number Of Souls / Female:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.numberOfSouls.operator"}
                    >
                      Number Of Souls / Operator:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text
                      type="secondary"
                      key={index + "fugitiveSouls.numberOfSouls.households"}
                    >
                      Number Of Souls / Households:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "fugitiveSouls.names"}>
                      Names:
                    </Text>{" "}
                    {item.fugitiveSouls.names}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.yearsOfRent"}
                    >
                      Years of Rent:
                    </Text>{" "}
                    {item.fugitiveSouls.yearsOfRent}
                  </>
                );
              default:
                return Object.keys(item).map((property, ii) => (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + item + ii + property}>
                      {property}:
                    </Text>{" "}
                    {item[property]}
                    <br />
                  </>
                ));
            }
          })()}
          <br />
        </>
      ))}
              </Col>
    <Col span={12} key={props.indexTransaction + "col-2"}>
              
      <Text type="secondary" key={props.indexTransaction + "counterAgentAction"}>
        Counter Agent Action:
      </Text>{" "}
      {props.data.counterAgentAction}
      <br />
      {props.data.counterAgentTransactionObjects.map((item, index) => (
        <>
          <Text type="secondary" key={props.indexTransaction + "counterAgentObjectOfTransaction-" + index}>
            Object of transaction:{" "}
          </Text>
          {item.object[0]}
          <br />
          {(() => {
            switch (item.object[0]) {
              case "immovableProperty":
                return (
                  <>
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.type"}
                    >
                      Type:
                    </Text>{" "}
                    {item.immovableProperty.type}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.share"}
                    >
                      Share:
                    </Text>{" "}
                    {item.immovableProperty.share}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.origin"}
                    >
                      Origin:
                    </Text>{" "}
                    {item.immovableProperty.origin}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.localisation"}
                    >
                      Localisation:
                    </Text>{" "}
                    {item.immovableProperty.localisation}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.neighbours"}
                    >
                      Neighbours:
                    </Text>{" "}
                    {item.immovableProperty.neighbours}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.surface-chetiVpole"}
                    >
                      Surface-chetiVpole:
                    </Text>{" "}
                    {item.immovableProperty.surface.chetiVpole}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.surface-sazheni-X"}
                    >
                      Surface-sazheni-X:
                    </Text>{" "}
                    {item.immovableProperty.surface.sazheni.x}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.surface-sazheni-Y"}
                    >
                      Surface-sazheni-Y:
                    </Text>{" "}
                    {item.immovableProperty.surface.sazheni.y}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population-male"}
                    >
                      Population-male:
                    </Text>{" "}
                    {item.immovableProperty.population.male}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population-female"}
                    >
                      Population-female:
                    </Text>{" "}
                    {item.immovableProperty.population.female}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population.operator"}
                    >
                      Population-operator:
                    </Text>{" "}
                    {item.immovableProperty.population.operator}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.population.households"}
                    >
                      Population-households:
                    </Text>{" "}
                    {item.immovableProperty.population.households}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.buildings"}
                    >
                      Buildings:
                    </Text>{" "}
                    {item.immovableProperty.buildings}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "-immovableProperty.appurtenances"}
                    >
                      Appurtenances:
                    </Text>{" "}
                    {item.immovableProperty.population.appurtenances}
                        <br />
                        
                  </>
                );
              case "money":
                return item.money.map((o, i) => (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "money-" + i + ".coin"}>
                      Coin:
                    </Text>{" "}
                    {o.coins}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "money-" + i + ".rubli"}
                    >
                      Rubli:
                    </Text>{" "}
                    {o.rubli}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "money-" + i + ".altyny"}
                    >
                      Altyny:
                    </Text>{" "}
                    {o.altyny}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "money-" + i + ".dengi"}
                    >
                      Dengi:
                    </Text>{" "}
                    {o.dengi}
                    <br />
                  </>
                ));
              case "forfeit":
                return item.forfeit.map((o, i) => (
                  <>
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".coin"}
                    >
                      Coin:
                    </Text>{" "}
                    {o.coins}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".rubli"}
                    >
                      Rubli:
                    </Text>{" "}
                    {o.rubli}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".altyny"}
                    >
                      Altyny:
                    </Text>{" "}
                    {o.altyny}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "forfeit-" + i + ".dengi"}
                    >
                      Dengi:
                    </Text>{" "}
                    {o.dengi}
                    <br />
                  </>
                ));
              case "chattels":
                return (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.type"}>
                      Type:
                    </Text>{" "}
                    {item.chattels.type}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.origin"}>
                      Origin:
                    </Text>{" "}
                    {item.chattels.origin}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.description"}>
                      Description:
                    </Text>{" "}
                    {item.chattels.description}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "chattels.price"}>
                      Price:
                    </Text>{" "}
                    {item.chattels.price}
                  </>
                );
              case "debt":
                return (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "debt.debtorName"}>
                      Debtor Name:
                    </Text>{" "}
                    {item.debt.debtorName}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "debt.debtDate"}>
                      Debt Date:
                    </Text>{" "}
                    {item.debt.debtDate}
                    <br />
                    {item.debt.amount.map((a, i) => (
                      <>
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".coins"}
                        >
                          Amount / Coins:
                        </Text>{" "}
                        {a.coins}
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".rubli"}
                        >
                          Amount / Rubli:
                        </Text>{" "}
                        {a.rubli}
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".altyny"}
                        >
                          Amount / Altyny:
                        </Text>{" "}
                        {a.altyny}
                        <Text
                          type="secondary"
                          key={props.indexTransaction + "-" + index + "a-" + i + ".dengi"}
                        >
                          Amount / Dengi:
                        </Text>{" "}
                        {a.dengi}
                      </>
                    ))}
                  </>
                );
              case "fugitiveSouls":
                return (
                  <>
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.juridicalStatus"}
                    >
                      Juridical Status:
                    </Text>{" "}
                    {item.fugitiveSouls.juridicalStatus}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.numberOfSouls.male"}
                    >
                      Number Of Souls / Male:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.numberOfSouls.female"}
                    >
                      Number Of Souls / Female:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.numberOfSouls.operator"}
                    >
                      Number Of Souls / Operator:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text
                      type="secondary"
                      key={index + "fugitiveSouls.numberOfSouls.households"}
                    >
                      Number Of Souls / Households:
                    </Text>{" "}
                    {item.fugitiveSouls.numberOfSouls.male}
                    <br />
                    <Text type="secondary" key={props.indexTransaction + "-" + index + "fugitiveSouls.names"}>
                      Names:
                    </Text>{" "}
                    {item.fugitiveSouls.names}
                    <br />
                    <Text
                      type="secondary"
                      key={props.indexTransaction + "-" + index + "fugitiveSouls.yearsOfRent"}
                    >
                      Years of Rent:
                    </Text>{" "}
                    {item.fugitiveSouls.yearsOfRent}
                  </>
                );
              default:
                return Object.keys(item).map((property, ii) => (
                  <>
                    <Text type="secondary" key={props.indexTransaction + "-" + item + ii + property}>
                      {property}:
                    </Text>{" "}
                    {item[property]}
                    <br />
                  </>
                ));
            }
          })()}
          <br />
        </>
      ))}
            </Col>
          </Row>
        <Text type="secondary" key={props.indexTransaction + "notesOnReverseSide"}>
        Notes on Reverside:
      </Text>{" "}
      {props.data.notesOnReverseSide}
      <br />
      <Text type="secondary" key={props.indexTransaction + "advancePayment"}>
        Advance Payment:
      </Text>{" "}
      {props.data.advancePayment === false ? (
            <Tag color="red">No</Tag>
          ) : (
            <Tag color="green">Yes</Tag>
          )}
          <br />
          <Text type="secondary" key={props.indexTransaction + "partialAdvance"}>
        Partial Advance:
      </Text>{" "}
      {props.data.partialAdvance === false ? (
            <Tag color="red">No</Tag>
          ) : (
            <Tag color="green">Yes</Tag>
          )}
      <br />
      <Text
        type="secondary"
        key={props.indexTransaction + "contractConditions"}
      >
        Contract Conditions:
      </Text>{" "}
      {props.data.contractConditions}
      <br />
      <Text type="secondary" key={props.indexTransaction + "contractDuration"}>
        Contract Duration:
      </Text>{" "}
      {props.data.contractDuration}
                  <br />

    </>
  );
};

export default Transaction;
