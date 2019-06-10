import { Table } from "antd";

function ResultsGrid({ pagination, columns, data }) {
  return <Table pagination={pagination} columns={columns} dataSource={data} />;
}

export default ResultsGrid;
