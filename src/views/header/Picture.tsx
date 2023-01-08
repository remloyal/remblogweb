import React, { useEffect, useState } from 'react';
import { getImg } from '../../api/image'

const Picture: React.FC = () => {
  const [image, setImage] = useState('');
  useEffect(() => {
    getImg().then(res => {
      setImage(res.data);
    })
  }, [])
  return (
    <div className='image' style={{ backgroundColor:'#49b1f5' }}></div>
  );
};

export default Picture;