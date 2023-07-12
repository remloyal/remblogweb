import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import Vdito from 'vditor'
// VditorPreview.mermaidRender(document)


const Index = () => {
  // console.log(VditorPreview);
  let data: AxiosResponse<any, any> | null = null;
  const inputEl = useRef(null);
  const getMd =async () =>{
    let res = await axios.get('/src/assets/md/测试.md')
    data = res.data
  }
  const [vd, setVd] = useState();
  useEffect(()=>{
    (async function anyNameFunction() {
      await getMd();
      // Vdito.preview(inputEl.current,data)
    })();
  },[])
  return <> <div id="VditorPreview" ref={inputEl} className="VditorPreview"> This is Index page</div></>
};
export default Index;