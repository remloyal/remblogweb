// import axios from "axios";
import { get } from "../fetch";

export const search = async (content: any) => {
  //   const data = await get(
  //     `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${content}&cb=window.fillSearchSug`
  //   );
  //   console.log(data);
  var value = content;
  var oScript = document.createElement("script");
  oScript.src =
    "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" +
    value +
    "&cb=aa";
  // 核心在这里，
  // 1.实时获取参数 value
  // 2.cb=返回值的处理函数（aa）
  document.body.appendChild(oScript);
  //   function aa(data) {
  //     var list = data.s;
  //     var str = "";
  //     if (list.length > 0) {
  //       list.forEach(function (ele, index) {
  //         str +=
  //           '<li><a href ="https://www.baidu.com/s?wd=' +
  //           ele +
  //           '">' +
  //           ele +
  //           "</li>";
  //       });
  //       oUl.innerHTML = str;
  //     } else {
  //       oUl.style.display = "none";
  //     }
  //   }

  //   return data;
};

export class SearchNavStore {
  constructor() {
    var that = this;
    window.searchsug = {
      //JSONP结果临时存放位置初始化
      res: [],
      sugbaidu: function (json: any) {
        this.res = [];
        this.res = json.s;
      },
      sugbing: function (json: any) {
        this.res = [];
        json.AS.Results.map((item: any) => {
          item.Suggests.map((item: any) => {
            this.res.push(item.Txt);
            return 0;
          });
          return 0;
        });
        that.suggest_search_prompt = this.res;
      },
    };
  }
  //搜索建议
  suggest_search_prompt = [];

  //获取搜索建议
  getSuggestSearchPrompt(value: string, engine: string) {
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
      setTimeout(() => {
        //延时处理结果
        this.suggest_search_prompt = [] as any;
        window.searchsug.res.map((item: any) => {
          let result = {
            id: new Date(),
            value: item,
          };
          this.suggest_search_prompt.push(result);
          return 0;
        });
      }, 500);
    }
  }
}
