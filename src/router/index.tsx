import { useRoutes } from "react-router-dom";

import List from "../views/List";
import Layout from "../views/Layout";

import Admin from "../views/admin/admin";
import Index from "../views/blog";
import { lazy } from "react";
// React 组件懒加载
const Indexs = lazy(() => import("../views/blog/main/Index"));
const Details = lazy(() => import("../views/blog/main/Details"));
const Tag = lazy(() => import("../views/blog/main/Tag"));
const Login = lazy(() => import("@/views/Login"));
const Home = lazy(() => import("@/views/blog/home/home"));

import RouteConfig from "./admin";
// 快速导入工具函数
// const lazyLoad = (moduleName: string) => {
//   const path = `../views/${moduleName}`
//   const Module = lazy(() => import(path));
//   return (
//     <Module />
//   )
// };

const routeConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index",
    element: <Index />,
    redirect: "index",
    children: [
      {
        path: "",
        element: <Indexs />,
      },
      {
        path: "details",
        element: <Details />,
      },
      {
        path: "tag",
        element: <Tag />,
      },
    ],
  },

  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/layout",
    element: <Layout />,
    //    children: [
    //         { path: '/children/child1', element: <Child1/> },
    //      { path: '/children/child2', element: <Child2/>  }
    //    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const Routes = () => {
  let data = [...routeConfig, ...RouteConfig];
  return useRoutes(data);
};

export default Routes;
