import { Select } from "antd";
import React, { useState, useEffect } from "react";
import { NumberBox } from "@appbaseio/reactivesearch";

const { Option } = Select;

const NumericBox = props => {
  const [numberFields, setNumberFields] = useState([]);

  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };

  const children = [];
  props.numberFields.map(element => {
    children.push(
      <Option key={element} value={element}>
        {element}
      </Option>
    );
  });

  const handleChange = value => {
    setNumberFields(value);
  };

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "100%", margin: "20px 0" }}
        placeholder="Please select a numeric field"
        allowClear={true}
        size="large"
        onChange={handleChange}
      >
        {children}
      </Select>

      {numberFields.map(field => (
        <div key={field}>
          <NumberBox
            style={{ padding: "10px" }}
            componentId={field}
            dataField={field}
            data={{ label: "", start: 0, end: 10 }}
            title={field}
            defaultValue={0}
            labelPosition="left"
            queryFormat="exact"
            URLParams={false}
            react={{
              and: newArray(
                props.numberFields,
                props.numberFields.indexOf(field)
              )
            }}
            showFilter
            title={field}
          />
        </div>
      ))}
    </>
  );
};

export default NumericBox;
