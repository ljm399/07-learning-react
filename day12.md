# 一.Tabs区域数据的展示

### 总布局

```react
  .content {
    margin: 30px auto 0;
    width: 1032px;
  }
```



### 1.1. 获取区域的数据



### 1.2. 展示的两块内容

- section-header
- section-tabs(没有展示)
- 第一次展示: ["成都"]



### 1.3. 封装Section-tabs

- tabNames的数组
- 监听点击: currentIndex => active
- 外界监听内部的点击
  - 外界传入的函数,最好用useCallback包裹

```react
const tabClickHandle = useCallback ((index, name) => {})
<section-tabs tabClick={tabClickHandle} /> 
```

- 外界可以设置name,获取对应的列表数据





### 1.4. 如何设置初始化的值

- name没有默认值:
  - Object.keys(dest_list)[0] ------ ()里面的对象要是undefined则报错
  - 问题: useState(初始化值), 只有第一次渲染组件时,才有效果

- 解决方案二:
  - 方案一: 没有数据的情况,不要进行第一次渲染
    - 渲染一次
  - 方案二: useEffect(() => {setName()})
    - 渲染三次





### 1.5. Section-Footer封装

- 根据是否传入name属性,决定如何展示
  - 如何展示文本
  - 如何展示样式



## 样式(导航栏)

```react
 <div className="scroll">
      <div className="scroll-content" ref={scrollContentRef}>
        {props.children}
      </div>
</div>

  .scroll { -- die独占父元素一行(这不是行内元素) 故不用设宽高
    overflow: hidden;

    .scroll-content {
        position: relative;
        display: flex;
        transition: transform 0.3s ease-in-out;
        margin: 0 -8px;

        .item {
          flex-shrink: 0; -- 必须设,不然默认为1,超出父元素宽度则压缩
          margin-right: 16px;
          padding: 8px 16px;
          border-radius: 3px
        }
      }
```









# 二.ScrollView的封装

### 2.1. 封装ScrollView

- props.children
- 计算scrollView要不要滚动
  - 获取scrollWidth
  - 获取clientWidth
  - const totalDistance = scrollWidth - clientWidth
  - totalDistance => 0, 显示右边的按钮



### 2.2. 点击右边的按钮滚动

- 记录索引: postIndex
- newIndex = postIndex + 1
- 根据newIndex索引获取到子元素children[newIndex]
- newEl.offesetLeft
  - 注意事项: 设置定位
- 修改scrollContentRef.current,style.transform = translate(xx)
- 设置最新的索引
- 判断右边按钮是否显示
- 判断左边按钮是否显示



### 2.3. 点击左边按钮和按钮的样式

- 左边按钮和右边按钮的逻辑一致

- 按钮的样式

  ```
    {showLeft && <LeftCircleTwoTone onClick={() => controlClick(false)} style={{ fontSize: '20px' }} twoToneColor={theme.color.primary} />}
        {showRight && <RightCircleTwoTone onClick={() => controlClick(true)} style={{ fontSize: '20px' }} twoToneColor={theme.color.primary} />}
     
     
  ----------  这个样式看浏览器-检查-找到目标组件知道
    .anticon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .anticon-left-circle {
      left: -25px;
    }
    .anticon-right-circle {
      right: -25px;
    }
  ```

  





### 2.4. 向往的城市数据的展示

- 获取数据
- 封装组件/item
- 展示数据
- 调整样式



### 2.5.plus的数据的展示

- 请求数据
- 封装section-v3
- flex-shrink: 0



### 2.6. 点击全部跳转entire页面







