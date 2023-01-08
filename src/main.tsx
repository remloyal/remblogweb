import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import './index.css';
import './assets/font/iconfont.css';
import './assets/css/index.less';
import { startSakura } from './components/fullScreenFlower';
import {
  RecoilRoot,
} from 'recoil';
// startSakura();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
