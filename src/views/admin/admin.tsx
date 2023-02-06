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
import {
  Outlet,
  useNavigate,
  useParams,
  useActionData,
} from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { routePath } from "@/stores/atom";
type MenuItem = Required<MenuProps>["items"][number];
import { MenuData } from '@/config/config'

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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuItem[] = [
    getItem("首页", "index", <PieChartOutlined />),
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
        getItem("Submenusub4", "sub4", null, [
          getItem("Option 13", "13"),
          getItem("Option 14", "14"),
        ])
      ]),
    ]),
  ];

  const [path, setPath] = useRecoilState(routePath);
  const onSelect = ({ keyPath }) => {
    // console.log({ item, key, keyPath, selectedKeys, domEvent });
    // console.log(selectedKeys);
    console.log(items);
    let itemPath: MenuItem
    const getPath = (indexKey, index) => {
      if (itemPath?.children) {
        itemPath = itemPath?.children.find(res => res.key == keyPath[keyPath.length - (index + 1)]);
      } else {
        itemPath = items.find(res => res.key == keyPath[keyPath.length - (index + 1)]);
      }
      console.log('itemPath', itemPath);
    }
    if (keyPath.length == 1) {
      itemPath = items.find(res => res.key == keyPath[keyPath.length - 1]);
    } else {
      for (let index = 0; index < keyPath.length; index++) {
        const indexKey = keyPath[keyPath.length - (index + 1)];
        console.log(indexKey)
        getPath(indexKey, index)
      }
    }

    // itemPath.children && getPath()
    itemPath && setPath({ type: 'add', data: itemPath })

    // navigate(key);
    // setTag(keyPath);
    // let data: string[] = [];
    // console.log(data);
    // tagData.forEach((res: string) => {
    //   data.push(res);
    // });
    // data.push(key);
    // // data.push(key)
    // setTagData(data);
  };
  const onClick = (props: any) => {
    setSelectedKeys([props.key])
  }
  const [breadItem, setBreadItem] = useState([]);

  useEffect(() => {
    if (path.type == 'click') {
      setSelectedKeys([path.data.key])
    }
  }, [path]);
  const [selectedKeys, setSelectedKeys] = useState()
  return (
    <Layout className="admin">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["index"]}
          items={items}
          selectedKeys={selectedKeys}
          onSelect={onSelect}
          onClick={onClick}
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
              {breadItem.map((res, index) => {
                return <Breadcrumb.Item key={index}>{res}</Breadcrumb.Item>;
              })}
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
          <div
            style={{
              margin: "10px",
              padding: "10px",
              minHeight: 280,
              width: "97%",
              height: "90%",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const Label: React.FC = () => {
  const navigate = useNavigate();
  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
  const [items, setItems] = useState([{
    label: '首页',
    key: 'index'
  }]);

  const [activeKey, setActiveKey] = useState(items[0].key);
  const [path, setPath] = useRecoilState(routePath);
  useEffect(() => {
    if (path.type == 'add') {
      add()
    }
  }, [path]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  const onTabClick = (key: string) => {
    console.log(key);
    // setActiveKey(key);
    navigate(key);
  };
  const add = () => {
    let data = path.data;
    let item = items.find(item => item.key == data.key);
    if (!item) {
      setItems([...items, { label: data.label, key: data.key }]);
    }
    setActiveKey(data.key);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const tabItem =
        newPanes[
        targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(tabItem.key);
      console.log(tabItem);
      setPath({ type: 'click', data: tabItem })
    }
    setItems(newPanes);
    console.log(newPanes);
  };
  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    console.log(targetKey);
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  
  return (
    <>
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
  );
};

export default Admin;
