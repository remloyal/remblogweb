import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";
import "./App.css";
import "./assets/font/iconfont.css";
import "./assets/css/index.less";
import { startSakura } from "./components/fullScreenFlower";
import { RecoilRoot } from "recoil";
import "./index.css";
import "./views/views.less";
// startSakura();
// console.log(window.UE);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
