import React, { useState, useEffect } from 'react';
import { Button, Image, Space, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { getImg } from '../../api/image'

const Center: React.FC = () => {
  const [ imgurl, setImgurl ] = useState<any>('')
  useEffect(() => {
    getImg().then(res=>{
      setImgurl(res.data)
    })
  }, [])
  return (
    <div className='site-info'>
      <div>
        <Image
          width={100}
          height={100}
          src={imgurl}
          preview={false}
        /></div>
      <div>多看书，多看报；少玩电脑，多睡觉</div>
      <div>联系方式</div>
    </div>
  );
};

export default Center;