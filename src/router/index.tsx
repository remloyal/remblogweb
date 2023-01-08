
import { useRoutes } from "react-router-dom"

import Home from "../views/Home"
import List from "../views/List"
import Layout from "../views/Layout"

import Admin from "../views/admin/admin"
import Index from "../views/blog"
import { lazy } from "react"
// React 组件懒加载
const Indexs = lazy(() => import('../views/main/Index'));
const Details = lazy(() => import('../views/main/Details'));
const Tag = lazy(() => import('../views/main/Tag'));

const routeConfig = [
  {
    path: '/',
    element: <Index />,
    redirect: 'index',
    children: [
      {
        path: '',
        element: <Indexs />,
      },
      {
        path: 'details',
        element: <Details />,
      },
      {
        path: 'tag',
        element: <Tag />,
      },
    ]
  },
  {
    path: '/Admin',
    element: <Admin />
  },
  {
    path: '/list',
    element: <List />
  },
  {
    path: '/layout',
    element: <Layout />,
    //    children: [
    //         { path: '/children/child1', element: <Child1/> },
    //      { path: '/children/child2', element: <Child2/>  }
    //    ]
  }
]
const Routes = () => (
  useRoutes(routeConfig)
)

export default Routes