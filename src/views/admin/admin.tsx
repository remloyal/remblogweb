import React, { useRef, useState, useEffect, Suspense } from "react";
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
// import "./admin.less";
const { Header, Sider, Content } = Layout;

import HeaderEl from "./Header";
import {
  Outlet,
  useNavigate,
  useParams,
  useActionData,
  To,
} from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { routePath } from "@/stores/atom";
type MenuItem = Required<MenuProps>["items"][number];
import { MenuData } from "@/config/config";
import { ItemType } from "antd/es/menu/hooks/useItems";

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
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuItem[] = [
    getItem("首页", "index", <PieChartOutlined />),
    // getItem("Option 2", "2", <DesktopOutlined />),
    // getItem("Option 3", "3", <ContainerOutlined />),
    getItem("文章", "sub", <MailOutlined />, [
      getItem("文章列表", "articleList"),
      getItem("新增文章", "addArticle"),
      getItem("分类管理", "articleSort"),
      getItem("标签管理", "lable"),
    ]),
    getItem("错误页面", "sub1", <MailOutlined />, [
      getItem("403", "403"),
      getItem("404", "404"),
      getItem("500", "500"),
    ]),
    // getItem("标签", "lable", <PieChartOutlined />),
    // getItem("错误日志", "8", <ContainerOutlined />),
    // getItem("页面配置", "sub2", <AppstoreOutlined />, [
    //   getItem("Option 9", "9"),
    //   getItem("Option 10", "10"),
    //   // getItem("Submenu", "sub3", null, [
    //   //   getItem("Option 11", "11"),
    //   //   getItem("Option 12", "12"),
    //   //   getItem("Submenusub4", "sub4", null, [
    //   //     getItem("Option 13", "13"),
    //   //     getItem("Option 14", "14"),
    //   //   ])
    //   // ]),
    // ]),
  ];

  const [path, setPath] = useRecoilState(routePath);
  const [tag, setTag] = useState();
  const onSelect = ({ key, keyPath }) => {
    let itemPath: ItemType | undefined;
    let tags = [];
    const getPath = (indexKey: any, index: number) => {
      if (itemPath?.children) {
        itemPath = itemPath.children.find(
          (res: { key: any; }) => res.key == keyPath[keyPath.length - (index + 1)]
        );
      } else {
        itemPath = items.find(
          (res) => res?.key == keyPath[keyPath.length - (index + 1)]
        );
      }
      tags.push(itemPath.label);
    };
    if (keyPath.length == 1) {
      itemPath = items.find((res) => res.key == keyPath[keyPath.length - 1]);
      tags.push(itemPath.label);
    } else {
      for (let index = 0; index < keyPath.length; index++) {
        const indexKey = keyPath[keyPath.length - (index + 1)];
        getPath(indexKey, index);
      }
    }
    itemPath && setPath({ type: "add", data: itemPath });
    navigate(key);
    setBreadItem(tags);
    console.log(breadItem);

  };

  const onClick = (props: any) => {
    setSelectedKeys([props.key]);
  };

  const [breadItem, setBreadItem] = useState(["首页"]);

  useEffect(() => {
    if (path.type == "click") {
      setSelectedKeys([path.data.key]);
    }
  }, [path]);
  useEffect(() => {
    navigate("/admin/index");
  }, []);
  const [selectedKeys, setSelectedKeys] = useState();
  return (
    <Layout className="admin">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="logo" /> */}
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
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
            <Breadcrumb className="breadcrumb" items={[
              ...breadItem.map((res, index) => {
                return {
                  title: res,
                };
              })
            ]}>
              {/* {breadItem.map((res, index) => {
                return <Breadcrumb.Item key={index}>{res}</Breadcrumb.Item>;
              })} */}
            </Breadcrumb>
          </div>
          <HeaderEl></HeaderEl>
        </Header>
        <Content
          style={{
            // margin: "24px 16px",
            // padding: 24,
            // minHeight: 280,
            // background: colorBgContainer,
            textAlign: "left",
            padding: "10px",
            minHeight: 280,
            width: "100%",
            height: "100%",
            overflow: 'hidden'
          }}
        >
          <Label />
          <Suspense>
            <div
              style={{
                // margin: "10px",
                // padding: "10px",
                // minHeight: 280,
                width: "100%",
                height: "94%",
                background: colorBgContainer,
                overflow: 'auto'
              }}
            >

              <Outlet />
            </div>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

const Label: React.FC = () => {
  const navigate = useNavigate();
  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
  const [items, setItems] = useState([
    {
      label: "首页",
      key: "index",
    },
  ]);

  const [activeKey, setActiveKey] = useState("index");
  const [path, setPath] = useRecoilState(routePath);
  useEffect(() => {
    if (path.type == "add") {
      add();
    }
  }, [path]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  const onTabClick = (key: string) => {
    navigate(key || "index");
    setPath({ type: "click", data: { key: key } });
  };
  const add = () => {
    let data = path.data;
    let item = items.find((item) => item.key == data.key);
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

      navigate(tabItem.key);
      setPath({ type: "click", data: tabItem });
    }
    setItems(newPanes);
  };
  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  useEffect(() => {
    if (items.length == 0) {
      setItems([
        {
          label: "首页",
          key: "index",
        },
      ]);
      navigate("index");
      setActiveKey("index");
      setPath({ type: "click", data: { key: "index" } });
    }
  }, [items]);
  return (
    <>
      <Tabs
        hideAdd
        onChange={onChange}
        onTabClick={onTabClick}
        activeKey={activeKey}
        className="site-tabs"
        type="editable-card"
        onEdit={onEdit}
        items={items}
      />
    </>
  );
};

export default Admin;
