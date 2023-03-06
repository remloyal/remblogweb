import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  getSort,
  addSort,
  reviseSort,
  deleteSort,
} from "@/api/articleApi/article";
import { FormInstance } from "rc-field-form";

interface DataType {
  lable_id: string;
  id: string;
  lable_name: string;
  lable_alias: string;
  lable_description: string;
}

const ArticleSort = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns: ColumnsType<DataType> = [
    {
      title: "标签名称",
      dataIndex: "lable_name",
      key: "lable_name",
    },
    {
      title: "标签别名",
      dataIndex: "lable_alias",
      key: "lable_alias",
    },
    {
      title: "标签描述",
      dataIndex: "lable_description",
      key: "lable_description",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onClick("修改分类", _)}>修改</a>
          <a onClick={() => deleteSore(_)}>删除</a>
        </Space>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [openTitle, setOpenTitle] = useState("添加分类");
  const [dataSort, srtDataSort] = useState({});
  const onClick = (type: string, data?: any) => {
    if (type == "添加分类") {
      setOpen(true);
      srtDataSort({});
    }
    if (type == "修改分类") {
      srtDataSort(data);
      setOpen(true);
    }
    setOpenTitle(type);
  };
  const closeOpen = (data?: any) => {
    setOpen(false);
    if (data) {
      revise(data, "revise");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteSore = (data: React.SetStateAction<{}>) => {
    srtDataSort(data);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const res = await deleteSort(dataSort["lable_id"]);
    if (res.code == 200) {
      message.success("删除成功");
      revise(dataSort,'delete');
    } else {
      message.error("删除失败");
    }
    setIsModalOpen(false);
    srtDataSort({});
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    srtDataSort({});
  };

  useEffect(() => {
    getSort().then((res) => {
      if (res.code == 200) {
        setDataSource(res.data);
      }
    });
  }, []);
  //   修改数据
  const revise = (data: any, type: string) => {
    let todo = [].concat(dataSource) as any;
    let index = todo.findIndex((res) => res.lable_id == data.lable_id);
    if (index != -1) {
      if (type == "revise") {
        todo.splice(index, 1, data);
      } else {
        todo.splice(index, 1);
      }
    }
    setDataSource(todo);
  };
  return (
    <div style={{ padding: "0 10px" }}>
      <div className="lable-add">
        <Button type="primary" onClick={() => onClick("添加分类")}>
          添加
        </Button>
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 520 }}
        rowKey={(record) => record.lable_id}
        // pagination={{
        //   // current: table.pageNumber,
        //   pageSize: 10,
        //   defaultPageSize: 10,
        //   showSizeChanger: true,
        //   pageSizeOptions: ["10", "20", "30", "40"],
        //   showTotal: (total, range) => `${range[0]}-${range[1]}  共${total}条`,
        //   onShowSizeChange: (current, pageSize) => {
        //     // table.pageSize = pageSize;
        //     // table.pageNumber = 1;
        //   },
        //   // onChange: (pageNumber) => (table.pageNumber = pageNumber),
        // }}
      />
      <Modal
        title="删除"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        width={300}
        cancelText="取消"
      >
        <p>是否删除该标签？</p>
      </Modal>
      <Modal
        title={openTitle}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        // width={500}
        destroyOnClose={true}
      >
        <div style={{ padding: "10px 10px 0 10px" }}>
          <AddArticleSort
            closeOpen={closeOpen}
            data={dataSort}
            type={openTitle}
          />
        </div>
      </Modal>
    </div>
  );
};

const AddArticleSort = (props: any) => {
  const onFinish = async (values: any) => {
    if (!values?.lable_description) {
      values.lable_description = "";
    }
    if (props.type == "添加分类") {
      addFinish(values);
    } else {
      reviseFinish(values);
    }
  };
  const addFinish = async (values: any) => {
    const res = await addSort(values);
    if (res.code == 200) {
      message.success("添加成功");
      props.closeOpen();
    } else {
      message.error(res.message);
    }
  };
  const reviseFinish = async (values: any) => {
    values["lable_id"] = props.data.lable_id;
    const res = await reviseSort(values);
    if (res.code == 200) {
      message.success("修改成功");
      props.closeOpen(values);
    } else {
      message.error(res.message);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const fromRef = useRef<FormInstance>(null);
  useEffect(() => {
    if (JSON.stringify(props.data) !== "{}") {
      fromRef.current?.setFieldsValue(props.data);
    }
  }, []);
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={fromRef}
      >
        <Form.Item
          label="标签名称"
          name="lable_name"
          rules={[{ required: true, message: "请输入名称！" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="标签别名"
          name="lable_alias"
          rules={[{ required: true, message: "请输入别名!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="标签描述" name="lable_description">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Row>
            <Col span={8} offset={8}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Col>
            <Col span={4}>
              <Button type="primary" danger onClick={props.closeOpen}>
                取消
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default ArticleSort;
