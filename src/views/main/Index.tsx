
import { Image, Divider, List, Typography, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import './main.less'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { windowSizes } from '../../stores/atom'
import { FolderOpenOutlined, MessageOutlined, AliwangwangOutlined, CarryOutOutlined } from '@ant-design/icons'

const data = [
  {
    title: 'Ant Design Title',
    context: '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    time: '2022-11-04',
    brief: "nt Design Title   nt Design Title"
  },
  {
    title: 'Ant Design Title 2',
    context: '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    time: '2022-11-04',
    brief: "nt Design Title   nt Design Title"
  },
  {
    title: 'Ant Design Title 3',
    context: 'nt Design Title',
    time: '2022-11-04',
    brief: "nt Design Title   nt Design Title"
  },
  {
    title: 'Ant Design Title 4',
    context: '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！',
    time: '2022-11-04',
    brief: "nt Design Title   nt Design Title"
  },
];


const Lists = () => {
  const className = 'item'
  return <>
    <div className="home-list">
      {
        data.map((item, index) => {
          return <div key={index} className={(index % 2) === 0 ? className : className + ' item-left'}>
            <div className='post_cover'>
              {/* <img
                src="/src/assets/image/002bd8ca60ffa5048f3c9ede5e0f0bf9.jpg"
              /> */}
              <Image
                preview={false}
                height={210}
                width={'100%'}
                src="/src/assets/image/002bd8ca60ffa5048f3c9ede5e0f0bf9.jpg"
              />
            </div>
            <div className='home-post-info'>
              <div className='post-date'>
                <CarryOutOutlined />
                发布于{item.time}
              </div>
              <div className='post-title'>表提</div>
              <div className="post-meta">
                <span>
                  <FolderOpenOutlined style={{ color: '#ffcc00' }} />
                  <a href="https://yaya.loveyl.cc/web/">
                    web					</a>
                </span>
                <span><AliwangwangOutlined style={{ color: '#ffcc00' }} />122 热度</span>
                <span className="comments-number">
                  <MessageOutlined style={{ color: '#ffcc00' }} />
                  <a href="https://yaya.loveyl.cc/index.php/2022/04/01/html2canvas-%e5%9b%be%e7%89%87%e8%b7%a8%e5%9f%9f%e4%b8%8e%e6%88%aa%e5%8f%96%e9%ab%98%e5%be%b7%e5%9c%b0%e5%9b%be/#comments">1 评论</a>					</span>

              </div>
              <div className='post-content'>{item.context}</div>
            </div>
          </div>
        })
      }
    </div>
  </>
}

const Aside = () => {
  // const [text, setText] = useRecoilState(windowSize);
  return <>
    <div className="home-aside">
      111111111111
      {/* <div>{count}</div> */}
    </div>
  </>
}


const Index = () => {
  const [windowSize, setWindowSize] = useRecoilState(windowSizes);
  return <>
    <div className={'home ' + (windowSize.width > 700 ? 'home-pc' : 'home-move')}>
      <Lists />
      <Aside />
    </div>
  </>
};
export default Index;