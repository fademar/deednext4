import React, { useState, useEffect } from "react";
import { Table, Divider } from "antd";
import { ReactiveList } from "@appbaseio/reactivesearch";
import Link from "next/link";

const columns = [
  {
    title: "",
    dataIndex: "_id",
    key: "_id",
    defaultSortOrder: "descend",
    sorter: (a, b) => a._id - b._id
  },
  {
    title: "Deed Code",
    dataIndex: "deedCode",
    key: "deedCode"
  },
  {
    title: "Deed Reference",
    dataIndex: "deedRef",
    key: "deedRef"
  },
  {
    title: "Deed Date",
    dataIndex: "deedDate",
    key: "deedDate",
    render: (text, record) => (
      <span>
        {record.deedDate.day === null ? "" : record.deedDate.day}{" "}
        {record.deedDate.month === null ? "" : record.deedDate.month}{" "}
        {record.deedDate.year === null ? "" : record.deedDate.year}
      </span>
    )
  },
  {
    title: "Deed Name",
    dataIndex: "deedName",
    key: "deedName",
    sorter: (a, b) => a.deedName.length - b.deedName.length
  },
  {
    title: "Complete",
    dataIndex: "complete",
    key: "complete"
  }
];

const ResultsGrid = props => {
  return (
    <ReactiveList
      componentId="results"
      dataField="_id"
      react={{
        and: props.sensors
      }}
      pagination
      pages={10}
      paginationAt="bottom"
      Loader="Loading..."
      noResults="No results were found..."
      render={({ loading, error, data }) => {
        if (loading) {
          return <div>Fetching Results...</div>;
        }
        if (error) {
          return (
            <div>
              Something went wrong! Error details {JSON.stringify(error)}
            </div>
          );
        }
        return (
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  props.onClick(record);
                } // click row
              };
            }}
            style={{ background: "#ffffff" }}
            rowKey={record => record._id}
            pagination={false}
            columns={columns}
            dataSource={data}
          />
        );
      }}
    />
  );
};

export default ResultsGrid;
