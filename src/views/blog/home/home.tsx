import { Input, Popover, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { throttle } from "lodash";
// import Menu from "../header/Menu";
import "./home.less";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

const Home = () => {
  let iframeUrl =
    "https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=accu&key=1a9233bf009741939b69c10497a968a1&v=_1678543529004" +
    "&random=" +
    Math.random().toString();
  useEffect(() => {
    // loadScript(
    //   "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0"
    // );
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <Menu /> */}
      <div
        className="home"
        style={{
          backgroundImage: `url('http://localhost:8000/resource?url=hvRKNXEElE4Bjjsq')`,
        }}
      >
        {/* <div id="he-plugin-standard" style={{zIndex:'999'}}></div> */}

        <Search />
        {/* <div className="weather">
          <iframe
            src={iframeUrl}
            // scrolling="no"
            // frameBorder="0"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = resolve;
    script.onerror = reject;
    script.crossOrigin = "anonymous";
    script.src = src;
    if (document.head.append) {
      document.head.append(script);
    } else {
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  });
};

const Search = () => {
  // const searchNavStore = new SearchNavStore();
  const addonAfter = (
    <div className="icon-label">
      <SearchOutlined />
    </div>
  );
  const addonBefore = (
    <div className="icon-label">
      <SearchOutlined />
    </div>
  );
  const [searchval, setSearchval] = useState("");
  const [textVal, setTextVal] = useState([]);
  const onFocus = (e: any) => {
    console.log(e.target.value);
  };
  const onChange = async (e: any) => {
    console.log(e.target.value);
    setSearchval(e.target.value);
    if (!e.target.value) {
      setTextVal([]);
    } else {
      getSuggestion(e.target.value);
    }
    // search(searchval);
    // getVal();
  };
  const onCompositionEnd = async (e: any) => {
    console.log(e.target.value);
    // setSearchval(e.target.value);
    // search(searchval);
    // await getSuggestSearchPrompt(searchval, "bing");
    // console.log(searchNavStore.suggest_search_prompt);
  };
  useEffect(() => {
    window.searchsug = {
      //JSONP结果临时存放位置初始化
      res: [],
      liindex: 0,
      sugbaidu: function (json: any) {
        this.res = [];
        this.res = json.s;
      },
      sugbing: function (json: any) {
        this.res = [];
        if (json.AS?.Results) {
          json.AS.Results.map((item: any) => {
            item.Suggests.map((item: any) => {
              this.res.push(item.Txt);
              return 0;
            });
            return 0;
          });
          setTextVal(this.res);
        }
      },
    };
    window.addEventListener("keydown", onKeyDown); // 添加全局事件
    return () => {
      window.removeEventListener("keydown", onKeyDown); // 销毁
    };
  }, []);

  const [liindex, setLiindex] = useState<number>(0);
  const onKeyDown = (e: any) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 38: // 向上
        window.searchsug.liindex -= 1;
        console.log(window.searchsug.liindex);
        if (window.searchsug.liindex < 0) {
          window.searchsug.liindex = 0;
        }
        setLiindex(window.searchsug.liindex);
        break;
      case 40: // 向下
        window.searchsug.liindex += 1;
        console.log(window.searchsug.liindex);
        if (window.searchsug.liindex >= window.searchsug.res.length) {
          window.searchsug.liindex = window.searchsug.res.length - 1;
        }
        setLiindex(window.searchsug.liindex);
        break;
      case 13: // 确认
        openUrl();
        break;
    }
  };

  const getSuggestion = throttle((value) => {
    getSuggestSearchPrompt(value || searchval, "bing");
  }, 500);
  //获取搜索建议
  const getSuggestSearchPrompt = (value: string, engine: string) => {
    if (value === "") {
      //判断输入框是否为空
    } else {
      if (engine === "baidu") {
        //判断当前搜索引擎
        let searchScript = document.createElement("script"); //JSONP获取
        searchScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${value}&cb=window.searchsug.sugbaidu`;
        document.body.appendChild(searchScript);
        document.body.removeChild(searchScript);
      } else if (engine == "bing" || engine == "google") {
        //判断当前搜索引擎
        let searchScript = document.createElement("script"); //JSONP获取
        searchScript.src = `https://api.bing.com/qsonhs.aspx?type=cb&q=${value}&cb=window.searchsug.sugbing`;
        document.body.appendChild(searchScript);
        document.body.removeChild(searchScript);
      }
      // setTimeout(() => {
      //   //延时处理结果
      //   this.suggest_search_prompt = [] as any;
      //   window.searchsug.res.map((item: any) => {
      //     let result = {
      //       id: new Date(),
      //       value: item,
      //     };
      //     this.suggest_search_prompt.push(result);
      //     return 0;
      //   });
      // }, 500);
    }
  };
  const openUrl = (value?: string) => {
    // https://cn.bing.com/search?q=33%E5%B2%81%E5%B1%9E%E4%BB%80%E4%B9%88%E7%94%9F%E8%82%96
    window.open(
      `https://cn.bing.com/search?q=${value || window.searchsug.res[liindex]}`
    );
  };
  function setVal(res: any) {
    console.log(res);
  }
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const textClick = (value: any) => {
    openUrl(value);
  };
  return (
    <>
      <div className="home-search">
        <Time />
        <div className="searchBarFather">
          <div id="searchBar">
            <input
              type="text"
              id="inputSearch"
              name="word"
              size={30}
              placeholder="搜索"
              autoComplete="off"
              onFocus={onFocus}
              value={searchval}
              onChange={onChange}
              onCompositionEnd={onCompositionEnd}
            />
            <div className="searchBarBtn" id="btnSearchEng">
              <Popover placement="bottom" content={content}>
                <SearchOutlined id="iconSearchEng" />
              </Popover>
            </div>
            <div className="searchBarBtn" id="btnSearch">
              <SearchOutlined />
            </div>
            <div>1111</div>
          </div>
          <ul>
            {textVal.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => textClick(item)}
                  className={`${liindex == index ? "active" : ""}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const Time = () => {
  const [moment, setMoment] = useState("2023-03-12 15:57:49");
  let timeInterval: number | undefined;
  useEffect(() => {
    timeInterval = setInterval(() => {
      startTiming();
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  const startTiming = () => {
    const date = new Date();
    const time = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    setMoment(time);
  };
  return (
    <>
      <div className="home-time">{moment}</div>
    </>
  );
};
export default Home;
