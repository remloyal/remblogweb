import React from 'react';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined, UnorderedListOutlined, CommentOutlined, ArrowUpOutlined, MessageOutlined } from '@ant-design/icons';


const Float: React.FC = () => (
  <>
    {/* <FloatButton.Group icon={<CustomerServiceOutlined />} type="primary" trigger="click">
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
      <FloatButton icon={<ArrowUpOutlined />} />
      <FloatButton icon={<ArrowUpOutlined />} />
      <FloatButton icon={<MessageOutlined />} />
    </FloatButton.Group> */}
    <FloatButton.Group icon={<UnorderedListOutlined />} type="primary" trigger="click">
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
      <FloatButton icon={<ArrowUpOutlined />} />
      <FloatButton icon={<MessageOutlined />} />
    </FloatButton.Group>
  </>
);

export default Float;
