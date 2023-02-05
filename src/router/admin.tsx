import { useRoutes } from "react-router-dom";

import List from "../views/List";
import Layout from "../views/Layout";

import Admin from "../views/admin/admin";
import Index from "@/views/admin/index/Index";
import { lazy } from "react";
// React 组件懒加载
const Details = lazy(() => import("../views/blog/main/Details"));
const Tag = lazy(() => import("../views/blog/main/Tag"));

import {
  FourHundredAndThree,
  FourHundredAndFour,
  FiveFundred,
} from "@/views/admin/errorPage/page";

const routeConfig = [
  {
    path: "/admin",
    element: <Admin />,
    redirect: "",
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "details",
        element: <Details />,
      },
      {
        path: "tag",
        element: <Tag />,
      },
      {
        path: "403",
        element: <FourHundredAndThree />,
      },
      {
        path: "404",
        element: <FourHundredAndFour />,
      },
      {
        path: "500",
        element: <FiveFundred />,
      },
    ],
  },
];

export default routeConfig;
