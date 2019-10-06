import * as _ from "lodash";
import { Descriptions, Divider, Col, Row, Typography, Tag } from "antd";
import Person from "./Person";
import Transaction from "./Transaction";

const { Text } = Typography;

const Deed = props => {
  const date = new Date(props.content.createdTime);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return (
    <div>
      <Descriptions
        title={
          "DEED #" +
          props.content._id +
          " | " +
          "database id: " +
          props.content.mongo_id +
          " | " +
          "created on: " +
          dt +
          "/" +
          month +
          "/" +
          year
        }
        column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 2, xs: 1 }}
        bordered
        size="small"
      >
        <Descriptions.Item label="Code">
          {props.content.deedCode}
        </Descriptions.Item>
        <Descriptions.Item label="Reference">
          {props.content.deedRef}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {props.content.deedDate.day}/{props.content.deedDate.month}/
          {props.content.deedDate.year}
        </Descriptions.Item>
        <Descriptions.Item label="Language">
          {props.content.deedLanguage}
        </Descriptions.Item>
        <Descriptions.Item label="Name" span={4}>
          {props.content.deedName}
        </Descriptions.Item>
        <Descriptions.Item label="Agent" span={2}>
          <Person data={props.content.agent} />
        </Descriptions.Item>
        <Descriptions.Item label="Counter Agent" span={2}>
          <Person data={props.content.counterAgent} />
        </Descriptions.Item>
        {props.content.coAgents ? (
          <Descriptions.Item label="co-Agents" span={2}>
            {props.content.coAgents.map((item, index) => (
              <>
                <div style={{ paddingBottom: "5px" }}>
                  <Person key={"coAgent" + index} data={item.coAgent} />
                </div>
              </>
            ))}
          </Descriptions.Item>
        ) : (
          <div span={4} />
        )}
        {props.content.coCounterAgents ? (
          <Descriptions.Item label="co-Counter Agents" span={2}>
            {props.content.coCounterAgents.map((item, index) => (
              <>
                <div style={{ paddingBottom: "5px" }}>
                  <Person
                    key={"coCounterAgent" + index}
                    data={item.coCounterAgent}
                  />
                </div>
              </>
            ))}
          </Descriptions.Item>
        ) : (
          <div span={4} />
        )}
        {_.isEmpty(props.content.transactions[0]) ? (
          <>{null}</>
        ) : (
          props.content.transactions.map((transaction, index) => (
            <Descriptions.Item
              label={"Transactions"}
              key={"Transaction-" + index}
              span={4}
            >
              <Transaction data={transaction} indexTransaction={index} />
            </Descriptions.Item>
          ))
        )}
        {_.isEmpty(props.content.whitnesses[0]) ? (
          <div span={4} />
        ) : (
          <Descriptions.Item label="Whitnesses" span={4}>
            <Row gutter={16}>
              {props.content.whitnesses.map((item, index) => (
                <>
                  <Col span={12}>
                    <Person key={"whitness" + index} data={item.whitness} />
                  </Col>
                </>
              ))}{" "}
            </Row>
          </Descriptions.Item>
        )}
        {_.isEmpty(props.content.sureties[0]) ? (
          <div span={4} />
        ) : (
          <Descriptions.Item label="Sureties" span={4}>
            <Row gutter={16}>
              {props.content.sureties.map((item, index) => (
                <Col span={12}>
                  <Person key={"surety" + index} data={item.surety} />
                </Col>
              ))}{" "}
            </Row>
          </Descriptions.Item>
        )}
        {_.isEmpty(props.content.otherParticipants[0]) ? (
          <div span={4} />
        ) : (
          <Descriptions.Item label="Other Participants" span={4}>
            <Row gutter={16}>
              {props.content.otherParticipants.map((item, index) => (
                <Col span={12}>
                  <Person
                    key={"otherParticipant" + index}
                    data={item.otherParticipant}
                  />
                </Col>
              ))}{" "}
            </Row>
          </Descriptions.Item>
        )}
        {props.content.scribe ? (
          <Descriptions.Item label="Scribe" span={4}>
            <Person key={"scribe"} data={props.content.scribe} />
          </Descriptions.Item>
        ) : (
          <div span={4} />
        )}
        <Descriptions.Item label="Registration" span={4}>
          <Row gutter={16}>
            <Col span={12}>{props.content.registrationDate}</Col>
            {props.content.registrator ? (
              <Col span={12}>
                <Person key={"registrator"} data={props.content.registrator} />
              </Col>
            ) : (
              <div span={4} />
            )}
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="Fees" span={4}>
          <Row gutter={16}>
            <Col span={12}>
              <Text type="secondary" key="fee-tax">
                Tax :
              </Text>{" "}
              {props.content.fees.tax.amount.map((a, index) => (
                <>
                  <Text
                    type="secondary"
                    key={"tax-" + a + "-" + index + ".coins"}
                  >
                    Coins:
                  </Text>{" "}
                  {a.coins} / {a.rubli}{" "}
                  <Text
                    type="secondary"
                    key={"tax-" + a + "-" + index + ".rubli"}
                  >
                    rubli
                  </Text>{" "}
                  {a.altyny}{" "}
                  <Text
                    type="secondary"
                    key={"tax-" + a + "-" + index + ".altyny"}
                  >
                    altyny
                  </Text>{" "}
                  {a.dengi}{" "}
                  <Text
                    type="secondary"
                    key={"tax-" + a + "-" + index + ".dengi"}
                  >
                    dengi
                  </Text>{" "}
                  <br />
                  <Text
                    type="secondary"
                    key={"tax-" + a + "-" + index + ".collected"}
                  >
                    Collected:
                  </Text>{" "}
                  {props.content.fees.tax.collected === false ? (
                    <Tag color="red">No</Tag>
                  ) : (
                    <Tag color="green">Yes</Tag>
                  )}
                </>
              ))}
            </Col>
            <Col span={12}>
              <Text type="secondary" key="fee-fee">
                Fee :
              </Text>{" "}
              {props.content.fees.fee.amount.map((a, index) => (
                <>
                  <Text
                    type="secondary"
                    key={"fee-" + a + "-" + index + ".coins"}
                  >
                    Coins:
                  </Text>{" "}
                  {a.coins} / {a.rubli}{" "}
                  <Text
                    type="secondary"
                    key={"fee-" + a + "-" + index + ".rubli"}
                  >
                    rubli
                  </Text>{" "}
                  {a.altyny}{" "}
                  <Text
                    type="secondary"
                    key={"fee-" + a + "-" + index + ".altyny"}
                  >
                    altyny
                  </Text>{" "}
                  {a.dengi}{" "}
                  <Text
                    type="secondary"
                    key={"fee-" + a + "-" + index + ".dengi"}
                  >
                    dengi
                  </Text>{" "}
                  <br />
                  <Text
                    type="secondary"
                    key={"fee-" + a + "-" + index + ".collected"}
                  >
                    Collected:
                  </Text>{" "}
                  {props.content.fees.fee.collected === false ? (
                    <Tag color="red">No</Tag>
                  ) : (
                    <Tag color="green">Yes</Tag>
                  )}
                </>
              ))}
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="Verbatim citations" span={4}>
          {props.content.verbatimCitations}
        </Descriptions.Item>
        <Descriptions.Item label="Researchers Notes" span={4}>
          {props.content.researcherNotes}
        </Descriptions.Item>
        <Descriptions.Item label="Complete" span={4}>
          {props.content.complete === false ? (
            <Tag color="red">No</Tag>
          ) : (
            <Tag color="green">Yes</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Deed;
