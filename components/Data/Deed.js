import { Descriptions } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

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
          <Text type="secondary">Referent Male: </Text>
          <Text type="secondary">Relationship to Agent:</Text>{" "}
          {data[type].referentMale.relationshipToAgent}
          <Text type="secondary">First Name:</Text>{" "}
          {data[type].referentMale.firstName}
          <Text type="secondary">Patronyme:</Text>{" "}
          {data[type].referentMale.patronyme}
          <Text type="secondary">Last Name:</Text>{" "}
          {data[type].referentMale.lastName}
          <Text type="secondary">Geogr Status:</Text>{" "}
          {data[type].referentMale.geogrStatus}
          <Text type="secondary">Social Status:</Text>{" "}
          {data[type].referentMale.socialStatus}
          <Text type="secondary">Related To:</Text>{" "}
          {data[type].referentMale.relatedTo}
        </div>
      );
    default:
      return null;
  }
};

const Deed = props => {
  return (
    <div>
      <Descriptions
        title={
          "Deed #" +
          props.content._id +
          " | " +
          "mongo id: " +
          props.content.mongo_id
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
        </Descriptions.Item>
        <Descriptions.Item label="Counter Agent" span={2}>
          <Person data={props.content} type={"counterAgent"} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Deed;
