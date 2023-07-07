import React, { useRef, useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, MenuProps, Row, SelectProps } from "antd";
import { Select, Space } from "antd";
import Tinymce from "./Tinymce";
import CKEditor from "./CKEditor";
import VditorEl from "./Vditor";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "1",
  },
];

const AddArticle = () => {
  const [markdown, setMarkdown] = useState("");
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setMarkdown(value);
  };

  const onClick = (data:object) => {
    console.log("data ===========>",data);
    
  }

  const onchange = (data:string) => {
    console.log("data1 ===========>",data);
    
  }


  return (
    <div style={{ padding: "10px" }}>
      {/* <VditorEl /> */}
      <FromData onclick={onClick} />
      <Space wrap>
        <Select
          defaultValue="Vditor"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "Tinymce", label: "Tinymce" },
            { value: "Vditor", label: "Vditor" },
          ]}
        />
      </Space>
      {markdown == "Tinymce" ? (
        <Tinymce />
      ) : (
        <VditorEl onchange={onchange}/>
      )}
    </div>
  );
};
const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
interface ButtonProps {
  onclick: (data: object) => void
}

const FromData = ({ onclick }: ButtonProps) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    onclick(values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    onclick(errorInfo)
  };

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[16, 24]}>
          <Col span={8}>
            <Form.Item
              label="名称"
              name="name"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="标题"
              name="title"
              rules={[
                { required: true, message: "Please input your title!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="描述"
              name="description"
              rules={[
                { required: true, message: "Please input your 描述!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="标签"
              name="type"
              rules={[
                { required: true, message: "Please input your type!" },
              ]}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Select
                  mode="tags"
                  placeholder="Please select"
                  defaultValue={["a10", "c12"]}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  options={options}
                />
              </Space>
            </Form.Item>
          </Col>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              提交
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default AddArticle;
