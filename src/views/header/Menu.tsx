
import React, { useState, useEffect } from 'react';
import { Drawer, MenuProps } from 'antd';
import { Dropdown, Space, Avatar, Button, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, DownOutlined, StepForwardOutlined, AntDesignOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { IconFont } from '../../components/icons';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { windowSizes } from '../../stores/atom'
import { useRecoilState } from 'recoil';

const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">电影</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">音乐</a>,
    key: '1',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const itemMenu: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
];

const Menus: React.FC = () => {
  const [windowSize, setWindowSize] = useRecoilState(windowSizes);
  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <div className='menu'>
    <div className='menu-left'>
      网站<span>{windowSize.width}</span></div>
    <div className='menu-right'>
      {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}
      {/* <div className='suspend'><StepForwardOutlined />首页</div>
            <div className='suspend'>关于</div>
            <div className='suspend'>标签</div>
            <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        列表
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown> */}
      <MenuBar innerWidth={windowSize.width} />
    </div>
  </div>
}

const MenuBar: React.FC = (props) => {
  const innerWidth = props.innerWidth;
  // <Button type="link" block>
  //   Link
  // </Button>
  const [state, setState] = useState(false)
  // const onSwitch = (e) => {
  //   console.log(e);
  //   // document.documentElement.setAttribute('class', e ? 'dark' : 'light')
  //   localStorage.setItem('theme', e ? 'dark' : 'light')

  // }
  // useEffect(() => {
  //   console.log(localStorage.getItem('theme'));
  //   setState(localStorage.getItem('theme') == 'dark' ? true : false)
  //   onSwitch(localStorage.getItem('theme') == 'dark' ? true : false)
  // }, [])
  const [open, setOpen] = useState(false);
  if (innerWidth > 900) {
    return <>
      <div className='suspend'><IconFont type="blog-sousuo" />搜索</div>
      <div className='suspend'><IconFont type="blog-zhuye1" />首页</div>
      <div className='suspend'><IconFont type="blog-aixin" />关于</div>
      <div className='suspend'><IconFont type="blog-24gl-tags3" />标签</div>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            列表
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      {/* <div>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={state}
          size="small"
          onChange={onSwitch}
        />
      </div> */}
    </>
  } else {

    return <>
      <IconFont type="菜单栏" style={{ fontSize: '18px', color: '#000', marginRight: "1vw" }} />
      <MenuFoldOutlined onClick={() => {
        setOpen(true);
      }} />
      <Drawer title="Basic Drawer" placement="right" onClose={() => {
        setOpen(false);
      }} open={open}  closable={false}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  }



}

export default Menus;