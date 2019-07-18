import { Descriptions } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

const Data = ({ data }) => {
  const items = Object.entries(data);
  const elements = [];
  for (let [key, value] of items) {
    typeof value !== "object"
      ? elements.push(
          <>
            <Text type="secondary" key={key}>
              {key}:
            </Text>{" "}
            {value}
            <br />{" "}
          </>
        )
      : console.log(value);
  }
  return <div>{elements}</div>;
};

const CoContractingParties = ({ data }) => {
  const elements = [];
  if (data.length > 0) {
    data.map(item => {});
  }
  return <div />;
};

const Person = ({ data, type }) => {
  const sex = type + "Sex";
  switch (data[sex]) {
    case "male":
      return (
        <div>
          <Text type="secondary">Sex:</Text> {data[sex]}
          <br />
          <Text type="secondary">First Name:</Text> {data[type].firstName}
          <br />
          <Text type="secondary">Patronyme:</Text> {data[type].patronyme}
          <br />
          <Text type="secondary">Last Name:</Text> {data[type].lastName}
          <br />
          <Text type="secondary">Geogr Status:</Text> {data[type].geogrStatus}
          <br />
          <Text type="secondary">Social Status:</Text> {data[type].socialStatus}
          <br />
          <Text type="secondary">Related To:</Text> {data[type].relatedTo}
        </div>
      );
    case "female":
      return (
        <div>
          <Text type="secondary">Sex:</Text> {data[sex]}
          <br />
          <Text type="secondary">First Name:</Text> {data[type].firstName}
          <br />
          <Text type="secondary">Patronyme:</Text> {data[type].patronyme}
          <br />
          <Text type="secondary">Family Status:</Text> {data[type].familyStatus}
          <br />
          <Text type="secondary">Related To:</Text> {data[type].relatedTo}
          <br />
          <Text underline type="secondary">
            Referent Male:
          </Text>{" "}
          <Text type="secondary">Relationship to Agent:</Text>{" "}
          {data[type].referentMale.relationshipToAgent}
          {" | "}
          <Text type="secondary">First Name:</Text>{" "}
          {data[type].referentMale.firstName}
          {" | "}
          <Text type="secondary">Patronyme:</Text>{" "}
          {data[type].referentMale.patronyme}
          {" | "}
          <Text type="secondary">Last Name:</Text>{" "}
          {data[type].referentMale.lastName}
          {" | "}
          <Text type="secondary">Geogr Status:</Text>{" "}
          {data[type].referentMale.geogrStatus}
          {" | "}
          <Text type="secondary">Social Status:</Text>{" "}
          {data[type].referentMale.socialStatus}
          {" | "}
          <Text type="secondary">Related To:</Text>{" "}
          {data[type].referentMale.relatedTo}{" "}
        </div>
      );
    case "bobody-corporatey":
      return (
        <div>
          <Text type="secondary">Sex:</Text> {data[sex]}
          <br />
          <Text type="secondary">Corporation Name:</Text>{" "}
          {data[type].corporationName}
          <br />
          <Text type="secondary">Number of Participants:</Text>{" "}
          {data[type].nbParticipants}
          <br />
          <Text type="secondary">Geogr Status:</Text> {data[type].geogrStatus}
          <br />
          <Text type="secondary">Social Status:</Text> {data[type].socialStatus}
          <br />
          <Text type="secondary">Names:</Text> {data[type].names}
        </div>
      );
    default:
      return (
        <div>
          <Text type="secondary">First Name:</Text> {data[type].firstName}
          <br />
          <Text type="secondary">Patronyme:</Text> {data[type].patronyme}
          <br />
          <Text type="secondary">Last Name:</Text> {data[type].lastName}
          <br />
          <Text type="secondary">Geogr Status:</Text> {data[type].geogrStatus}
          <br />
          <Text type="secondary">Social Status:</Text> {data[type].socialStatus}
          <br />
          <Text type="secondary">Related To:</Text> {data[type].relatedTo}
        </div>
      );
  }
};

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
        bordered
        column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 4, xs: 1 }}
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
        <Descriptions.Item label="" span={4} />
        <Descriptions.Item label="Agent" span={2}>
          <Person data={props.content} type={"agent"} />
          {/* <Data data={props.content.agent} /> */}
        </Descriptions.Item>
        <Descriptions.Item label="Counter Agent" span={2}>
          <Person data={props.content} type={"counterAgent"} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Deed;
