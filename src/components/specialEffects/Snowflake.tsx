// import React from 'react';
import { useEffect } from 'react';
import Script from 'react-load-script';
// import './snowy.js'
const Snowflake = () => {
    const useScript = (urls: string[]) => {
        // 顺序引入两个外部js文件
        useEffect(() => {
            let data = []
            urls.forEach(url => {
                const script = document.createElement('script');
                script.src = url;
                script.async = false;
                document.body.appendChild(script);
                data.push(script)
            })
            return () => {
                data.forEach(res => {
                    document.body.removeChild(res);
                })
            };
        }, [...urls]);
    };
    useScript([
        "http://www.lmlblog.com/winter/templets/xq/js/snowy.js",
        "http://www.lmlblog.com/blog/12/js/Snow.js"
    ])
    return <>
        {/* <Script url="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" />
        <Script url="http://www.lmlblog.com/winter/templets/xq/js/snowy.js" />
        <Script url="http://www.lmlblog.com/blog/12/js/Snow.js" /> */}
    </>
};
export default Snowflake;