
import { Image, Divider, List, Typography, Avatar } from 'antd';
import { useState } from 'react';

const data = [
  {
    title: 'Ant Design Title 1',
    context: 'nt Design Title',
    time: '2022-11-04',
    brief: "nt Design Title   nt Design Title"
  },
  {
    title: 'Ant Design Title 2',
    context: 'nt Design Title',
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
    context: 'nt Design Title',
    time: '2022-11-04',
    brief: "nt Design Title   nt Design Title"
  },
];

const Lists = () => (
  <>
    <div className="home-list">
      {/* <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
          >
            <div className='item'>
              <div className='post_cover'>
                <img
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </div>
              <div className='home-post-info'>
                <div>{item.title}</div>
                <div>{item.title}</div>
                <div>{item.title}</div>
              </div>
            </div>
          </List.Item>
        )}
        
      /> */}
      {
        data.map(item => {
          return <div className='item'>
            <div className='post_cover'>
              <img
                src="/src/assets/image/002bd8ca60ffa5048f3c9ede5e0f0bf9.jpg"
              />
            </div>
            <div className='home-post-info'>
              <div>{item.title}</div>
              <div>{item.title}</div>
              <div>{item.title}</div>
            </div>
          </div>
        })
      }
    </div>
  </>
)

const Aside = () => {
  return <>
    <div className="home-aside">
      111111111111
    </div>
  </>
}


const Index = () => {
  return <>
    <div className="home">
      <Lists />
      <Aside />
    </div>
  </>
};
export default Index;