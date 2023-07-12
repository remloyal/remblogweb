import { useRoutes } from "react-router-dom";
import Admin from "../views/admin/admin";
import React, { lazy } from "react";
// React 组件懒加载
const Index = lazy(() => import("@/views/admin/index/Index"));
const Details = lazy(() => import("../views/blog/main/Details"));
const Tag = lazy(() => import("../views/blog/main/Tag"));
const AddArticle = lazy(() => import("@/views/admin/article/AddArticle"));
const ArticleList = lazy(() => import("@/views/admin/article/ArticleList"));
const ArticleSort = lazy(() => import("@/views/admin/article/Sort"));

const Lable = lazy(() => import("@/views/admin/article/Lable"));

import {
  FourHundredAndThree,
  FourHundredAndFour,
  FiveFundred,
} from "@/views/admin/errorPage/page";

const routeConfig = [
  {
    path: "/admin",
    element: <Admin />,
    redirect: "/index",
    children: [
      {
        path: "index",
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
        path: "addArticle",
        element: <AddArticle />,
      },
      {
        path: "articleList",
        element: <ArticleList />,
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
      {
        path: "lable",
        element: <Lable />,
      },
      {
        path: "articleSort",
        element: <ArticleSort />,
      },
    ],
  },
];

export default routeConfig;
