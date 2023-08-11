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

  const getData = async (pageNumber?: number) => {
    if (pageNumber) {
      setPage({ ...page, page: pageNumber });
    }
    const res = await getArticleList(page);
    if (res.code == 200) {
      setTotal(res.data.total);
      setData(res.data.records as LableType[]);
    }
  };

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
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '修改日期',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
          current: page.page,
          pageSize: page.size,
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40"],
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]}  共${total}条`,
          onShowSizeChange: async (current, pageSize) => {
            // table.pageSize = pageSize;
            // table.pageNumber = 1;
            console.log(current, pageSize);

            await setPage({
              page: 1,
              size: pageSize,
            })
            await getData()
          },
          onChange: async (pageNumber) => {
            console.log(pageNumber);
            await getData(pageNumber)
          },
        }}
      />
    </>
  );
};

export default Lable;
