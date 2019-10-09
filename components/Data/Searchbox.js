import React, { useState, useEffect } from "react";
import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import { Row, Col, Select } from "antd";

const { Option } = Select;

const SearchBox = props => {
  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };

  const [fields, setFields] = useState(props.textFields);

  const children = [];
  useEffect(() => {
    children.push(
      <Option key="all-fields" value="all-fields">
        All fields
      </Option>
    );
    props.textFields.forEach(element => {
      children.push(
        <Option key={element} value={element}>
          {element}
        </Option>
      );
    });
  }, [props.textFields]);

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />
        </Col>
      </Row>
    </>
  );
};

const fullQuery = value => {
  return {
    query: {
      multi_match: {
        query: value,
        zero_terms_query: "all",
        type: "cross_fields"
      }
    }
  };
};

export default SearchBox;
