import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import htmlToMd from "html-to-md";

const init = {
  // selector: "#textarea",
  language: "zh-Hans",
  height: "100%",
  menubar: true,
  skin: "oxide-dark",
  auto_focus: true, //（自动获得焦点）
  // inline: true,
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
    "help",
    "preview",
    "fullscreen",
    "autosave",
    "paste",
    "autolink",
    "charmap",
    "wordcount print quickbars",
    "save",
  ],
  // fullscreen_native: true, //网页全屏
  toolbar:
    "undo redo | formatselect | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help | preview | fullscreen | autosave | paste | charmap | save",
  // content_style:
  //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

const AddArticle = () => {
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
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      let htmlEl = editorRef.current.getContent();
      // console.log(editorRef.current.getContent());
      handleExportMD(htmlEl);
    }
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        tinymceScriptSrc={"/public/tinymce/js/tinymce/tinymce.min.js"}
        apiKey="zt5s69rf909gpcjyeitoxk99uinpk8gvwpx6hwyefnm0zvls"
        init={init}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default AddArticle;
