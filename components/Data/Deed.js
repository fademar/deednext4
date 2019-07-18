import * as _ from "lodash";
import { Descriptions } from "antd";
import { Divider } from "antd";
import { Typography } from "antd";
import Person from "./Person";

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
          <Person data={props.content.agent} />
        </Descriptions.Item>
        <Descriptions.Item label="Counter Agent" span={2}>
          <Person data={props.content.counterAgent} />
        </Descriptions.Item>
        {_.isEmpty(props.content.coAgents[0]) ? (
          <></>
        ) : (
          <Descriptions.Item label="co-Agents" span={2}>
            {props.content.coAgents.map((item, index) => (
              <>
                <div style={{ paddingBottom: "5px" }}>
                  <Person key={"coAgent" + index} data={item.coAgent} />
                </div>
              </>
            ))}
          </Descriptions.Item>
        )}
        {_.isEmpty(props.content.coCounterAgents[0]) ? (
          <></>
        ) : (
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
        )}
      </Descriptions>
    </div>
  );
};

export default Deed;
