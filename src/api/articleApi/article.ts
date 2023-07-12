import { get, post, ResponseData } from '../fetch';

// 获取所有文章分类
export const getSort = async (): Promise<ResponseData> => {
  return await get('allSort');
};

// 添加文章分类
interface AddSort {
  lable_alias: string;
  lable_description: string;
  lable_name?: string;
}

export const addSort = async (param: AddSort) => {
  return await post('create', param);
};

export const reviseSort = async (param: AddSort) => {
  return await post('updateSort', param);
};

export const deleteSort = async (id: any) => {
  return await get('deleteSort', { id: id });
};

// 添加文章
interface ArticleData {
  title?: string;
  content?: string;
  category?: string;
  description?: string;
}
export const createArticle = async (param: ArticleData): Promise<ResponseData> => {
  return await post('createArticle', param);
};
