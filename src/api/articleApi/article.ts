import { get, post } from "../fetch";

// 获取所有文章分类
export const getSort = async () => {
  return await get("allSort");
};

// 添加文章分类
interface AddSort {
  lable_alias: string;
  lable_description: string;
  lable_name?: string;
}

export const addSort = async (param: AddSort) => {
  return await post("create", param);
};

export const reviseSort = async (param: AddSort) => {
    return await post("updateSort", param);
  };
