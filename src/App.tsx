import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import Router from "./router/index";
import { windowSizes } from './stores/atom'
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
  }, []);
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;