import { Table } from "antd";
import { ReactiveList } from "@appbaseio/reactivesearch";

const columns = [
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
    key: "deedDate"
  },
  {
    title: "Deed Name",
    dataIndex: "deedName",
    key: "deedName"
  },
  {
    title: "Complete",
    dataIndex: "complete",
    key: "complete"
  }
];

function ResultsGrid(props) {
  return (
    <ReactiveList
      componentId="results"
      dataField="deedName"
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
            style={{ background: "#ffffff" }}
            rowKey={record => record.mongo_id}
            pagination={false}
            columns={columns}
            dataSource={data}
          />
        );
      }}
    />
  );
}

export default ResultsGrid;
