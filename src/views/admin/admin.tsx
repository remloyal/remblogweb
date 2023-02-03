import React, { useRef, useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Tabs, theme } from "antd";
import type { MenuProps } from "antd";
import "./admin.less";
const { Header, Sider, Content } = Layout;

import HeaderEl from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { routeTable, routeTag, routeTagData } from '@/stores/atom'

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuItem[] = [
    getItem("首页", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Option 3", "3", <ContainerOutlined />),

    getItem("错误页面", "sub1", <MailOutlined />, [
      getItem("403", "403"),
      getItem("404", "404"),
      getItem("500", "500"),
    ]),
    getItem("错误日志", "8", <ContainerOutlined />),
    getItem("页面配置", "sub2", <AppstoreOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 11", "11"),
        getItem("Option 12", "12"),
      ]),
    ]),
  ];
  const [route, setRoute] = useRecoilState(routeTable)
  const [tag, setTag] = useRecoilState(routeTag)
  const [tagData, setTagData] = useRecoilState(routeTagData)

  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log({ item, key, keyPath, selectedKeys, domEvent });
    navigate(key)
    setTag(keyPath)
    let data: string[] = [];
    console.log(data);
    tagData.forEach((res: string) => {
      data.push(res)
    })
    data.push(key)
    // data.push(key)
    setTagData(data)
  }
  const [breadItem, setBreadItem] = useState([])
  useEffect(() => {
    let newPath = [...tag].reverse();
    setBreadItem(newPath)
  }, [tag])
  return (
    <Layout className="admin">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onSelect={onSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="site-header"
        >
          <div className="site-trigger">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Breadcrumb className="breadcrumb">
              {
                breadItem.map((res, index) => {
                  return <Breadcrumb.Item key={index}>{res}</Breadcrumb.Item>
                })
              }
            </Breadcrumb>
          </div>
          <HeaderEl></HeaderEl>
        </Header>
        <Content
        // style={{
        //   margin: "24px 16px",
        //   padding: 24,
        //   minHeight: 280,
        //   background: colorBgContainer,
        // }}
        >
          <Label />
          <div style={{
            margin: "10px",
            padding: '10px',
            minHeight: 280,
            width: '97%',
            height: '90%',
            background: colorBgContainer,
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const Label: React.FC = () => {
  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
  const defaultPanes = new Array(15).fill(null).map((_, index) => {
    const id = String(index + 1);
    return { label: `Tab Tab Tab ${id}`, key: id };
  });
  const [route, setRoute] = useRecoilState(routeTable)
  const [tag, setTag] = useRecoilState(routeTag)
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);
  const [tagData, setTagData] = useRecoilState(routeTagData)
  useEffect(() => {
    let data: { label: any; key: any; }[] = []
    var newArr = [];
    var arrId = [];
    tagData.forEach((element: any) => {

      data.push({ label: element, key: element })
    });
    for (var item of data) {
      if (arrId.indexOf(item['label']) == -1) {
        arrId.push(item['label']);
        newArr.push(item);
      }
    }
    console.log(arrId,newArr);
    setItems([...newArr]);
  }, [tagData])
  const onChange = (key: string) => {
    setActiveKey(key);
  };
  const onTabClick = (key: string) => {
    console.log(key);
    // setActiveKey(key);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([...items, { label: 'New Tab', key: newActiveKey }]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    console.log(targetKey);

    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return <>
    <Tabs
      hideAdd
      onChange={onChange}
      onTabClick={onTabClick}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEdit}
      items={items}
    />
  </>
}

export default Admin;
