import { Select } from "antd";
import React, { useState, useEffect } from "react";
import { SingleRange, RangeSlider } from "@appbaseio/reactivesearch";

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

      {numberFields.map(field =>
        field.includes("nbParticipants") ||
        field.includes("numberOfParticipants") ? (
          <div key={field}>
            <RangeSlider
              componentId={field}
              dataField={field}
              range={{
                start: 0,
                end: 10
              }}
              showFilter={true}
              filterLabel={field}
              URLParams={false}
              stepValue={1}
              showHistogram={true}
              snap={true}
            />
          </div>
        ) : (
          <div key={field}>
            <SingleRange
              componentId={field}
              dataField={field}
              data={[
                { start: 0, end: 1, label: "Amount < 1" },
                { start: 1, end: 5, label: "Amount 1 to 5" },
                { start: 5, end: 100, label: "Amount > 5" }
              ]}
              title={field}
              showRadio={true}
              showFilter={true}
              filterLabel={field}
              URLParams={false}
            />
          </div>
        )
      )}
    </>
  );
};

export default NumericBox;
