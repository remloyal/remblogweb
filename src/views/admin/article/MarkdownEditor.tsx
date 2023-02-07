// 导入React、react-markdown-editor-lite，以及一个你喜欢的Markdown渲染器
import * as React from 'react'
// npm i markdown-it -S
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import emoji  from 'markdown-it-emoji'
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
MdEditor.use(emoji)
// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);
// mdParser.use(emoji ['', options])
// Finish!
function handleEditorChange({html, text}) {    
  console.log('handleEditorChange', html, text)
}
export default (props) => {
  return (
    <MdEditor
      style={{ height: "100%" }}
      shortcuts={true}
      // plugins={['emoji']}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  )
}

// export default MarkdownEditor;
