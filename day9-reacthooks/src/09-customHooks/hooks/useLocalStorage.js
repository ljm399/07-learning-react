import { useEffect, useState } from "react";
function useLocalStorage(key) {
  // 1.从localStorage中获取数据,并且数据创建组件的state
  const [data, setData] = useState(() => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    // 解析JSON字符串为对象
    return JSON.parse(item);
  });

  // 2.监听data的变化,将最新的数据存储到localStorage中
  useEffect(() => {
    //为什么要JSON.stringify(data)
    //因为localStorage只能存储字符串,不能存储对象
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];

}
export default useLocalStorage;