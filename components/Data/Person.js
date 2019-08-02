import { Typography } from "antd";

const { Text } = Typography;

const Person = ({ data }) => {
  if (data.sex) {
    switch (data.sex) {
      case "male":
        return (
          <>
            <Text type="secondary">Sex:</Text> {data.sex}
            <br />
            <Text type="secondary">First Name:</Text> {data.firstName}
            <br />
            <Text type="secondary">Patronyme:</Text> {data.patronyme}
            <br />
            <Text type="secondary">Last Name:</Text> {data.lastName}
            <br />
            <Text type="secondary">Geogr Status:</Text> {data.geogrStatus}
            <br />
            <Text type="secondary">Social Status:</Text> {data.socialStatus}
            <br />
            <Text type="secondary">Related To:</Text> {data.relatedTo}
          </>
        );
      case "female":
        return (
          <>
            <Text type="secondary">Sex:</Text> {data.sex}
            <br />
            <Text type="secondary">First Name:</Text> {data.firstName}
            <br />
            <Text type="secondary">Patronyme:</Text> {data.patronyme}
            <br />
            <Text type="secondary">Family Status:</Text> {data.familyStatus}
            <br />
            <Text type="secondary">Related To:</Text> {data.relatedTo}
            <br />
            <Text underline type="secondary">
              Referent Male:
            </Text>{" "}
            <Text type="secondary">Relationship to Agent:</Text>{" "}
            {data.referentMale.relationshipToAgent}
            {" | "}
            <Text type="secondary">First Name:</Text>{" "}
            {data.referentMale.firstName}
            {" | "}
            <Text type="secondary">Patronyme:</Text>{" "}
            {data.referentMale.patronyme}
            {" | "}
            <Text type="secondary">Last Name:</Text>{" "}
            {data.referentMale.lastName}
            {" | "}
            <Text type="secondary">Geogr Status:</Text>{" "}
            {data.referentMale.geogrStatus}
            {" | "}
            <Text type="secondary">Social Status:</Text>{" "}
            {data.referentMale.socialStatus}
            {" | "}
            <Text type="secondary">Related To:</Text>{" "}
            {data.referentMale.relatedTo}{" "}
          </>
        );
      case "body-corporate":
        return (
          <>
            <Text type="secondary">Sex:</Text> {data.sex}
            <br />
            <Text type="secondary">Corporation Name:</Text>{" "}
            {data.corporationName}
            <br />
            <Text type="secondary">Number of Participants:</Text>{" "}
            {data.nbParticipants}
            <br />
            <Text type="secondary">Geogr Status:</Text> {data.geogrStatus}
            <br />
            <Text type="secondary">Social Status:</Text> {data.socialStatus}
            <br />
            <Text type="secondary">Names:</Text> {data.names}
          </>
        );
      default:
        return null;
    }
  } else {
    return (
      <>
        <Text type="secondary">First Name:</Text> {data.firstName}
        <br />
        <Text type="secondary">Patronyme:</Text> {data.patronyme}
        <br />
        <Text type="secondary">Last Name:</Text> {data.lastName}
        <br />
        <Text type="secondary">Geogr Status:</Text> {data.geogrStatus}
        <br />
        <Text type="secondary">Social Status:</Text> {data.socialStatus}
        <br />
        <Text type="secondary">Related To:</Text> {data.relatedTo}
        <br />
        {data.role ? (
          <>
            <Text type="secondary">Role:</Text> {data.role}
          </>
        ) : null}
      </>
    );
  }
};

export default Person;
