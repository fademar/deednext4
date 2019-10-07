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
    key: "deedCode",
    sorter: (a, b, sortOrder) =>
      a.deedCode.localeCompare(b.deedCode + "-" + b.deedRef, "en", {
        numeric: true
      }) * (sortOrder == "asc" ? 1 : -1)
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
        {record.deedDate.day === "" ? "" : record.deedDate.day + "-"}
        {record.deedDate.month === "" ? "" : record.deedDate.month + "-"}
        {record.deedDate.year}
      </span>
    ),
    sorter: (a, b, sortOrder) =>
      (
        a.deedDate.year +
        "-" +
        a.deedDate.month +
        "-" +
        a.deedDate.day
      ).localeCompare(
        b.deedDate.year + "-" + b.deedDate.month + "-" + b.deedDate.day,
        "en",
        { numeric: true }
      ) * (sortOrder == "asc" ? 1 : -1)
  },
  {
    title: "Deed Name",
    dataIndex: "deedName",
    key: "deedName",
    sorter: (a, b, sortOrder) =>
      a.deedName.localeCompare(b.deedName, "ru") * (sortOrder == "asc" ? 1 : -1)
  },
  {
    title: "Complete",
    dataIndex: "complete",
    key: "complete",
    filters: [
      {
        text: "true",
        value: "true"
      },
      {
        text: "false",
        value: "false"
      }
    ],
    onFilter: (value, record) => (record.complete = value)
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
      size={1000}
      pagination={false}
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
                  props.onClick(event, record);
                } // click row
              };
            }}
            style={{ background: "#ffffff" }}
            rowKey={record => record._id}
            pagination={true}
            columns={columns}
            dataSource={data}
          />
        );
      }}
    />
  );
};

export default ResultsGrid;
