import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const init = {
  language: "zh-Hans",
  height: "100%",
  menubar: false,
  auto_focus: true, //（自动获得焦点）
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

const AddArticle = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
