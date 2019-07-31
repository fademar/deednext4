import React from "react";
import { DataSearch, SelectedFilters } from "@appbaseio/reactivesearch";
import { Row, Col } from "antd";

const SearchBox = props => {
  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <DataSearch
            componentId="searchSensor"
            dataField={props.textFields}
            queryFormat="and"
            autosuggest={true}
            filterLabel="search"
            placeholder="Full-Text Search : search for any term anywhere..."
            URLParams={false}
            customQuery={fullQuery}
            debounce={300}
            react={{
              and: newArray(
                props.sensors,
                props.sensors.indexOf("searchSensor")
              )
            }}
          />
          <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />
        </Col>
      </Row>
    </>
  );
};

const fullQuery = value => {
  return {
    query: {
      multi_match: { query: value, zero_terms_query: "all" }
    }
  };
};

export default SearchBox;
