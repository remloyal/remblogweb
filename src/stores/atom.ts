import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

// 窗口大小
export const windowSize = atom({
  key: "windowSize",
  default: (async () => {
    // const res: any = await getProductList()
    // return res.data.products
    const getWindowSize = () => ({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    });
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };
    useEffect(() => {
      // 监听
      window.addEventListener("resize", handleResize);
      // 销毁
      return () => window.removeEventListener("resize", handleResize);
    });
    return windowSize;
  })(), // 返回 promise
});

// 购物车 state
export const cartAtom = atom({
  key: "cartState",
  default: [],
});

// 订单 state
export const orderAtom = atom({
  key: "orderState",
  default: [],
});
