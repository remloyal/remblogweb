
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

export const MenuData = [
  {
    label: '首页',
    path: 'index',
    icon: <PieChartOutlined />,
  },
  {
    label: 'Option 2',
    path: '2',
    icon: <DesktopOutlined />,
  },
  {
    label: 'Option 3',
    path: '3',
    icon: <DesktopOutlined />,
  },
  {
    label: '错误页面',
    path: 'sub1',
    icon: <MailOutlined />,
    type: "group",
    children: [
      {
        label: '403',
        path: '403',
      },
      {
        label: '404',
        path: '404',
      },
      {
        label: '500',
        path: '500',
      },
    ]
  },
  {
    label: '错误日志',
    path: '8',
    icon: <ContainerOutlined />,
  },
  {
    label: '页面配置',
    path: 'sub2',
    icon: <MailOutlined />,
    type: "group",
    children: [
      {
        label: '406',
        path: '406',
      },
      {
        label: '407',
        path: '407',
      },
      {
        label: 'Option 13',
        path: '13',
        type: "group",
        children: [
          {
            label: '408',
            path: '408',
          },
          {
            label: '409',
            path: '409',
          },
        ]
      },
    ]
  },
]