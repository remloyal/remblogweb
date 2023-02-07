import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
const MyEditor = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Hello from CKEditor 5!</p>"
      onReady={editor => {
        console.log('Editor is ready to use!', editor);
      }}
      config={{
        language: 'zh-cn',
        plugins:[Autoformat ]
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
    />
  );
}

export default MyEditor;