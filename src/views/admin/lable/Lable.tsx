import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  alias: string;
  description: string;
}

const Lable = () => {
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      alias: "32",
      description: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "John Brown",
      alias: "32",
      description: "New York No. 1 Lake Park",
    },
    {
      key: "3",
      name: "John Brown",
      alias: "32",
      description: "New York No. 1 Lake Park",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "标签名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "标签别名",
      dataIndex: "alias",
      key: "alias",
    },
    {
      title: "标签描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="lable-add">
        <Button type="primary">添加</Button>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={data}
        pagination={{
          // current: table.pageNumber,
          pageSize: 10,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40"],
          showTotal: (total, range) => `${range[0]}-${range[1]}  共${total}条`,
          onShowSizeChange: (current, pageSize) => {
            // table.pageSize = pageSize;
            // table.pageNumber = 1;
          },
          // onChange: (pageNumber) => (table.pageNumber = pageNumber),
        }}
      />
    </>
  );
};

export default Lable;
