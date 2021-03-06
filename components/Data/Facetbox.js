import { Select } from "antd";
import React, { useState, useEffect } from "react";
import { MultiDropdownList, SelectedFilters } from "@appbaseio/reactivesearch";

const { Option } = Select;

const FacetBox = props => {
  const [textfields, setTextFields] = useState([]);

  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };

  const children = [];
  props.textFields.map(element => {
    children.push(
      <Option key={element} value={element}>
        {element}
      </Option>
    );
  });

  const handleChange = value => {
    setTextFields(value);
  };

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "100%", margin: "20px 0" }}
        placeholder="Please select a text field"
        allowClear={true}
        size="large"
        onChange={handleChange}
      >
        {children}
      </Select>

      {textfields.map(field => (
        <div key={field}>
          <MultiDropdownList
            style={{ padding: "10px" }}
            componentId={field}
            dataField={field + ".keyword"}
            showCheckbox
            react={{
              and: newArray(props.textFields, props.textFields.indexOf(field))
            }}
            showSearch={true}
            showCount={true}
            URLParams={false}
            title={field}
          />
        </div>
      ))}
    </>
  );
};

export default FacetBox;
