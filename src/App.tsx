import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import Router from "./router/index";
import { windowSizes } from './stores/atom'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

function App() {
  const getWindowSize = () => ({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [windowSize, setWindowSize] = useRecoilState(windowSizes);
  // const [windowSize, setWindowSize] = useState(getWindowSize());
  const handleResize = () => {
    // console.log(getWindowSize());
    setWindowSize(getWindowSize());
  };
  useEffect(() => {
    // 监听
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    
    <ConfigProvider locale={zhCN} theme={{
      token: {
        colorPrimary: '#1677ff',
      },
    }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;