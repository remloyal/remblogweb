import { useEffect, useState } from "react";
import { atom, useRecoilState, selector } from "recoil";

// 窗口大小
export const windowSize = selector({
  key: "windowSize",
  get: ({ get }) => {
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
    console.log(windowSize);

    useEffect(() => {
      // 监听
      console.log(6666666);

      window.addEventListener("resize", handleResize);
      // 销毁
      // return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }, // 返回 promise
});

// 购物车 state
export const cartAtom = atom({
  key: "cartState",
  default: [],
});

// 订单 state
export const windowSizes = atom({
  key: "windowSizes",
  default: {},
});

export const routeTable = atom({
  key: "routeTable",
  default: {
    tag: [],
    tagPath:'',
    router:''
  },
});

export const routeTag = atom({
  key: "routeTag",
  default: []
});

export const routeTagData = atom({
  key: "routeTagData",
  default: [] as any
});

