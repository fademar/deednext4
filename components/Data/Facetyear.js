import React, { useState, useEffect } from "react";
import { MultiList } from "@appbaseio/reactivesearch";

const FacetYear = props => {
  const newArray = (arr, index) => {
    return arr.slice(0, index).concat(arr.slice(index + 1));
  };

  return (
    <MultiList
      style={{ padding: "10px" }}
      componentId="yearSensor"
      dataField="deedDate.year"
      size={20}
      sortBy="desc"
      queryFormat="or"
      showCheckbox
      showSearch={false}
      react={{
        and: newArray(props.sensors, props.sensors.indexOf("yearSensor"))
      }}
      showFilter
      showCount={true}
      filterLabel="Year"
      URLParams={false}
    />
  );
};

export default FacetYear;
