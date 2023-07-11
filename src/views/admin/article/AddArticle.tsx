import React, { useMemo, useRef, useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, MenuProps, Modal, Row, SelectProps } from 'antd';
import { Select, Space } from 'antd';
import Tinymce from './Tinymce';
import CKEditor from './CKEditor';
import VditorEl from './Vditor';
import TextArea from 'antd/es/input/TextArea';
import { createArticle } from '@/api/articleApi/article';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '1',
  },
];

interface AdminView {
  children: React.ReactNode;
  title: string;
  right?: React.ReactNode;
}

const AdminBody = (props: AdminView) => {
  return (
    <div>
      <div className="admin-head">
        <div className="title">{props.title}</div>
        <div className="right">{props.right}</div>
      </div>
      <div className="admin-body">{props.children}</div>
    </div>
  );
};

interface ArticleData {
  title?: string;
  content?: string;
  category?: string;
  description?: string;
}


const AddArticle = () => {
  const [markdown, setMarkdown] = useState('');
  const [data, setData] = useState<ArticleData>({});
  const [content, setContent] = useState('');
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setMarkdown(value);
  };

  const onClick = (data: object) => {
    console.log('data ===========>', data);
  };

  const onDatachange = async (todo: object) => {
    console.log('data1 ===========>', data);
    console.log('content===',content);
    
    const record = {
      ...data,
      ...todo,
      content:JSON.stringify(content)
    }
    const res = await createArticle(record);
    console.log(res);

    // setData({
    //   ...record,
    //   // description:todo.description
    // })
    console.log('data', data);

  };

  const onTitlechange = (text: string) => {
    setData({
      title: text
    })
  };

  const onContentChange = (content: string) => {
    setContent(content);
  }

  return (
    <AdminBody title="新增文章" right={<div></div>}>
      <ArticleTitle data={data} onTitlechange={onTitlechange} onDatachange={onDatachange} />
      {/* <FromData onclick={onClick} /> */}
      <Space wrap>
        <Select
          defaultValue="Vditor"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'Tinymce', label: 'Tinymce' },
            { value: 'Vditor', label: 'Vditor' },
          ]}
        />
      </Space>
      {markdown == 'Tinymce' ? <Tinymce /> : <VditorEl onContentChange={onContentChange} />}
    </AdminBody>
  );
};

const ArticleTitle = (props: { data: ArticleData, onTitlechange: (text: string) => void, onDatachange: (data: object) => void; }) => {
  const [data, setData] = useState<ArticleData>({});

  const onFinish = (values: { title: string }) => {
    console.log('Success:', values);
    props.onTitlechange(values.title)
    setOpen(true)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const [open, setOpen] = useState(false);

  const onClick = (data: object) => {
    console.log('data ===========>', data);
    props.onDatachange(data)
  };

  return (
    <>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Row gutter={[16, 24]}>
          <Col span={16}>
            <Form.Item label="文章标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              发布文章
            </Button>
          </Form.Item>
        </Row>
      </Form>
      <Modal
        title={<div>发布文章</div>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={700}
        destroyOnClose={true}
      >
        <FromData onclick={onClick} data={props.data}></FromData>
      </Modal>
    </>
  );
};

interface ButtonProps {
  onclick: (data: object) => void;
  data: ArticleData
}

const FromData = ({ onclick, data }: ButtonProps) => {
  const options: SelectProps['options'] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    onclick(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    onclick(errorInfo);
  };

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item label="标题" >
          <div>{data.title}</div>
        </Form.Item>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="分类" name="category" rules={[{ required: true, message: '请输入分类' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="文章描述" name="description" rules={[{ required: true, message: '请输入文章描述!' }]}>
          <TextArea />
        </Form.Item>
        {/* <Form.Item label="标签" name="type" rules={[{ required: true, message: 'Please input your type!' }]}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Select mode="tags" placeholder="Please select" defaultValue={['a10', 'c12']} onChange={handleChange} style={{ width: '100%' }} options={options} />
          </Space>
        </Form.Item> */}
        <Row gutter={[16, 24]}>
          <Form.Item wrapperCol={{ offset: 18, span: 12 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default AddArticle;
