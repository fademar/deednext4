import { Select } from "antd";
import React, { useState, useEffect } from "react";
import { SingleList } from "@appbaseio/reactivesearch";

const { Option } = Select;

const BooleanBox = props => {
  const [booleanFields, setBooleanFields] = useState([]);

  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };

  const children = [];
  props.booleanFields.map(element => {
    children.push(
      <Option key={element} value={element}>
        {element}
      </Option>
    );
  });

  const handleChange = value => {
    setBooleanFields(value);
  };

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "100%", margin: "20px 0" }}
        placeholder="Please select a boolean field"
        allowClear={true}
        size="large"
        onChange={handleChange}
      >
        {children}
      </Select>

      {booleanFields.map(field => (
        <div key={field}>
          <SingleList
            style={{ padding: "10px" }}
            componentId={field}
            dataField={field}
            react={{
              and: newArray(
                props.booleanFields,
                props.booleanFields.indexOf(field)
              )
            }}
            showRadio={true}
            showCount={true}
            URLParams={false}
            title={field}
          />
        </div>
      ))}
    </>
  );
};

export default BooleanBox;
