import "vditor/dist/index.css";
import React, { useEffect, useState } from "react";
import Vditor from "vditor";
import htmlToMd from "html-to-md";
import { Button } from "antd";
import axios, { AxiosResponse } from "axios";
import { updateFile } from '@/api/update/update'
import { baseURL } from '@/api/fetch';
import { useRecoilState } from "recoil";
import { articleContent } from "@/stores/manage";

function handleExportMD(contentHtml: any) {
  // html转换为markdown
  const markdown = htmlToMd(contentHtml);
  let blob = new Blob([markdown]);
  // 创建url
  let url = window.URL.createObjectURL(blob);
  // 创建a标签
  let a = document.createElement("a");
  // 导出地址
  a.href = url;
  // 导出文件名
  a.download = "markdown.md";
  a.click();
}

const VditorEl = React.memo(() => {
  const [vd, setVd] = useState<Vditor>();
  const [content, setContent] = useRecoilState(articleContent);

  useEffect(() => {
    // import('@/assets/md/')
    let data: AxiosResponse<any, any> | null = null
    axios.get('/src/assets/md/测试.md').then(res => {
      data = res.data
    })
    const vditor = new Vditor("vditor", {
      // height: '85vh',
      // minHeight: 400,
      height: "73vh",
      // lang: 'zh_CN',
      mode: "ir",
      // cdn: "www.bootcdn.cn",
      theme: 'classic',
      counter: {
        enable: true
      },
      toolbarConfig: {
        pin: true
      },
      fullscreen: {
        index: 999
      },
      // resize: {
      //   enable: true
      // },
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "upload",
        "record",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "fullscreen",
        "edit-mode",
        {
          name: "more",
          toolbar: [
            "both",
            "code-theme",
            "content-theme",
            "export",
            "outline",
            "preview",
            "devtools",
            "info",
            "help",
          ],
        },
        // {
        //   hotkey: '⇧⌘S',
        //   name: 'sponsor',
        //   tipPosition: 's',
        //   tip: '成为赞助者',
        //   className: 'right',
        //   icon: '<svg t="1589994565028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2808" width="32" height="32"><path d="M506.6 423.6m-29.8 0a29.8 29.8 0 1 0 59.6 0 29.8 29.8 0 1 0-59.6 0Z" fill="#0F0F0F" p-id="2809"></path><path d="M717.8 114.5c-83.5 0-158.4 65.4-211.2 122-52.7-56.6-127.7-122-211.2-122-159.5 0-273.9 129.3-273.9 288.9C21.5 562.9 429.3 913 506.6 913s485.1-350.1 485.1-509.7c0.1-159.5-114.4-288.8-273.9-288.8z" fill="#FAFCFB" p-id="2810"></path><path d="M506.6 926c-22 0-61-20.1-116-59.6-51.5-37-109.9-86.4-164.6-139-65.4-63-217.5-220.6-217.5-324 0-81.4 28.6-157.1 80.6-213.1 53.2-57.2 126.4-88.8 206.3-88.8 40 0 81.8 14.1 124.2 41.9 28.1 18.4 56.6 42.8 86.9 74.2 30.3-31.5 58.9-55.8 86.9-74.2 42.5-27.8 84.3-41.9 124.2-41.9 79.9 0 153.2 31.5 206.3 88.8 52 56 80.6 131.7 80.6 213.1 0 103.4-152.1 261-217.5 324-54.6 52.6-113.1 102-164.6 139-54.8 39.5-93.8 59.6-115.8 59.6zM295.4 127.5c-72.6 0-139.1 28.6-187.3 80.4-47.5 51.2-73.7 120.6-73.7 195.4 0 64.8 78.3 178.9 209.6 305.3 53.8 51.8 111.2 100.3 161.7 136.6 56.1 40.4 88.9 54.8 100.9 54.8s44.7-14.4 100.9-54.8c50.5-36.3 108-84.9 161.7-136.6 131.2-126.4 209.6-240.5 209.6-305.3 0-74.9-26.2-144.2-73.7-195.4-48.2-51.9-114.7-80.4-187.3-80.4-61.8 0-127.8 38.5-201.7 117.9-2.5 2.6-5.9 4.1-9.5 4.1s-7.1-1.5-9.5-4.1C423.2 166 357.2 127.5 295.4 127.5z" fill="#141414" p-id="2811"></path><path d="M353.9 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2812"></path><path d="M659.3 415.6m-33.8 0a33.8 33.8 0 1 0 67.6 0 33.8 33.8 0 1 0-67.6 0Z" fill="#0F0F0F" p-id="2813"></path><path d="M411.6 538.5c0 52.3 42.8 95 95 95 52.3 0 95-42.8 95-95v-31.7h-190v31.7z" fill="#5B5143" p-id="2814"></path><path d="M506.6 646.5c-59.6 0-108-48.5-108-108v-31.7c0-7.2 5.8-13 13-13h190.1c7.2 0 13 5.8 13 13v31.7c0 59.5-48.5 108-108.1 108z m-82-126.7v18.7c0 45.2 36.8 82 82 82s82-36.8 82-82v-18.7h-164z" fill="#141414" p-id="2815"></path><path d="M450.4 578.9a54.7 27.5 0 1 0 109.4 0 54.7 27.5 0 1 0-109.4 0Z" fill="#EA64F9" p-id="2816"></path><path d="M256 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2817"></path><path d="M703.3 502.7a32.1 27.5 0 1 0 64.2 0 32.1 27.5 0 1 0-64.2 0Z" fill="#EFAFF9" p-id="2818"></path></svg>',
        //   click () {alert('捐赠地址：https://ld246.com/sponsor')},
        // }
      ],
      // outline: {
      //   enable: true,
      //   position: "left"
      // },
      after: () => {
        setVd(vditor);
      },
      input: (value) => {
        setContent(value);
      },
      upload: {
        url: baseURL + '/upload', // 上传url
        // accept: 'image/jpeg,image/png,image/gif,image/jpg,image/bmp', // 图片格式
        max: 10 * 1024 * 1024,  // 控制大小
        multiple: false, // 是否允许批量上传
        fieldName: 'files',
        // filename(name) {
        //   return name
        //     .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
        //     .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
        //     .replace("/\\s/g", "");
        // },
        // handler: async function (files) {
        //   const data = await updateFile(files);
        //   console.log(data);
        //   let succFileText = "";
        //   if (data.start == 200) {
        //     const url = `http://localhost:8000${data.data.flie_path}`;
        //     if (vditor && vditor.vditor.currentMode === "wysiwyg") {
        //       succFileText += `\n <img alt=${data.data.name} src="${url}">`;
        //     } else {
        //       succFileText += `  \n![${data.data.name}](${url})`;
        //     }
        //     return succFileText;
        //   }
        //   return '测试';
        // },
        format(files, responseText) {
          const { data } = JSON.parse(responseText);
          console.log(data);
          const url = `http://localhost:8000/resource?url=${data.file_id}`;
          // const url = `http://localhost:8000${data.flie_path}`;
          const name = `${data.name}.${data.suffix_name}`
          return JSON.stringify({
            "msg": data.name,
            "code": "0",
            "data": {
              "errFiles": [],
              "succMap": {
                [name]: url,
              }
            }

          })
        },
      }
    });
  }, []);
  const onClick = () => {
    // console.log(vd.getValue());
    // console.log(vd);
    // vd.html2md(vd.getValue())
    const data = vd!.html2md(vd!.getHTML());
    console.log(data);

    // handleExportMD(vd.getHTML())
  }
  return <>
    <div id="vditor" className="vditor" />
    {/* <Button type="primary" onClick={onClick}>Primary Button</Button> */}
  </>;
});

export default VditorEl;
