import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import htmlToMd from "html-to-md";

const init = {
  // selector: "#textarea",
  language: "zh-Hans",
  height: "70vh",
  menubar: true,
  // skin: "oxide-dark",
  skin: "oxide",
  paste_data_images: true, // 允许粘贴图像
  auto_focus: true, //（自动获得焦点）
  // inline: true,
  // plugins: [
  //   "advlist autolink lists link image charmap print preview anchor",
  //   "searchreplace visualblocks code fullscreen",
  //   "insertdatetime media table paste code help wordcount",
  //   "help",
  //   "preview",
  //   "fullscreen",
  //   "autosave",
  //   "paste",
  //   "autolink",
  //   "charmap",
  //   "wordcount print quickbars",
  //   "save",
  //   'quickbars', 'link', 'table'
  // ],
  // plugins: [
  //   'advlist autolink lists link image charmap print preview anchor',
  //   'searchreplace visualblocks code fullscreen',
  //   'insertdatetime media table paste code help wordcount imagetools codesample'
  // ],
  // toolbar:
  //   'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | removeformat |image|codesample|code|preview|fullscreen | help',

  quickbars_selection_toolbar: 'bold italic forecolor | link blockquote quickimage',
  quickbars_insert_toolbar: 'quickimage quicktable',
  codesample_languages: [
    { text: 'HTML/XML', value: 'markup' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'CSS', value: 'css' },
    { text: 'PHP', value: 'php' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'Python', value: 'python' },
    { text: 'Java', value: 'java' },
    { text: 'C', value: 'c' },
    { text: 'C#', value: 'csharp' },
    { text: 'C++', value: 'cpp' },
    { text: 'Scala', value: 'scala' }
  ],
  plugins: 'export pagebreak code emoticons image imagetools table paste lists advlist checklist link hr charmap directionality fullscreen preview codesample',
  toolbar: 'export pagebreak | formatselect fontselect fontsizeselect bold italic underline strikethrough forecolor backcolor subscript superscript | alignleft aligncenter alignright alignjustify indent outdent rtl ltr | bullist numlist checklist | emoticons image table link hr charmap fullscreen preview codesample', 
  // menu: {
  //   file: { title: '文件', items: 'newdocument' },
  //   edit: { title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall' },
  //   insert: { title: '插入', items: 'link media | template hr' },
  //   view: { title: '查看', items: 'visualaid' },
  //   format: { title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
  //   table: { title: '表格', items: 'inserttable tableprops deletetable | cell row column' },
  //   tools: { title: '工具', items: 'spellchecker code' }
  // },
  // fullscreen_native: true, //网页全屏
  // toolbar:
  //   "undo redo | formatselect | " +
  //   "bold italic backcolor | alignleft aligncenter " +
  //   "alignright alignjustify | bullist numlist outdent indent | " +
  //   "removeformat | help | preview | fullscreen | autosave | paste | charmap | save",
  // content_style:
  //   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  
};

const Tinymce = () => {
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
        tinymceScriptSrc={"/tinymce/js/tinymce/tinymce.min.js"}
        apiKey="zt5s69rf909gpcjyeitoxk99uinpk8gvwpx6hwyefnm0zvls"
        init={init}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
};


export default Tinymce;
