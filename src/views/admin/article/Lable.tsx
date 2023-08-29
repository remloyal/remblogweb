import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { getArticleList, PageParams } from "@/api/articleApi/article";

interface DataType {
  key: string;
  name: string;
  alias: string;
  description: string;
}

interface LableType {
  key: string;
  tag_id: string | null;
  tag_name: string;
  tag_describe: string;
  createdAt: string;
  updatedAt: string;
}

const Lable = () => {
  const [data, setData] = useState<LableType[]>([]);
  const [page, setPage] = useState<PageParams>({
    page: 1,
    size: 10,
  });
  // total
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getArticleList(page);
    if (res.code == 200) {
      setTotal(res.data.total);
      const todos: LableType[] = [];

      for (let index = 0; index < res.data.records.length; index++) {
        const todo = res.data.records[index];
        todos.push({
          key: (index + 1).toString(),
          tag_id: todo.tag_id,
          tag_name: todo.tag_name,
          tag_describe: todo.tag_describe,
          createdAt: todo.createdAt,
          updatedAt: todo.updatedAt,
        });
      }
      setData(todos);
    }
  };

  useEffect(() => {
    console.log(page);
    
    getData();
  }, [page.size, page.page]);

  const columns: ColumnsType<LableType> = [
    {
      title: "标签名称",
      dataIndex: "tag_name",
      key: "tag_name",
    },
    {
      title: "标签别名",
      dataIndex: "tag_describe",
      key: "tag_describe",
    },
    {
      title: "创建日期",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "修改日期",
      dataIndex: "updatedAt",
      key: "updatedAt",
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
    <div style={{ padding: '0 10px' }}>
      <div className="lable-add">
        <Button type="primary">添加</Button>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={data}
        // style={{ height: "400px" }}
        scroll={{y:520}}
        pagination={{
          current: page.page,
          pageSize: page.size,
          defaultCurrent: 1,
          defaultPageSize: 10,
          // showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40"],
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]}  共${total}条`,
          onShowSizeChange: (current, pageSize) => {
            console.log("pageSize =====>", pageSize);
            setPage({
              page: 1,
              size: pageSize,
            });
          },
          onChange: (pageNumber) => {
            setPage({
              size: page.size,
              page: pageNumber,
            });
          },
        }}
      />
    </div>
  );
};

export default Lable;
