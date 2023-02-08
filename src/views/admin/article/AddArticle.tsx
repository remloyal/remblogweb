import React, { useRef, useState } from "react";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Select, Space } from 'antd';
import Tinymce from "./Tinymce";
import MarkdownEditor from "./MarkdownEditor";
import CKEditor from "./CKEditor";
import Milkdown from "./Milkdown";
import VditorEl from "./Vditor";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '1',
  }
];

const AddArticle = () => {
  const [markdown, setMarkdown] = useState('')
  const markdownEl = {
    Tinymce: <Tinymce />,
    Milkdown: <Milkdown />,
    VditorEl: <VditorEl />
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setMarkdown(value)
  };

  return (
    <>
      {/* <VditorEl /> */}
      {
        markdown == 'Tinymce' ? <Tinymce /> : markdown == 'Milkdown' ? <Milkdown /> : <VditorEl />
      }
      <Space wrap>
        <Select
          defaultValue="Vditor"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'Tinymce', label: 'Tinymce' },
            { value: 'Milkdown', label: 'Milkdown' },
            { value: 'Vditor', label: 'Vditor' },
          ]}
        />
      </Space>
    </>
  );
};

export default AddArticle;
