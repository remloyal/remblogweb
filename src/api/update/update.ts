import { instance } from '../fetch';

export const updateFile = async (files: File[]) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  const data = await instance({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return data.data;
};
