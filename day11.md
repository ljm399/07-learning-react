# 一.scroll,client,offset

先看网站： 
https://juejin.cn/post/7018372558999257102
和
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent

**`offsetLeft`**

- 含义：元素左上角相对于其**定位父元素（offsetParent）**左内边距的距离。
- 举例：如果一个 `div` 在父容器里，父容器有 `padding-left: 20px`，而元素本身距离父容器左边 50px，那么 `offsetLeft = 50`。


**`offsetTop`**

- 含义：元素顶部相对于 `offsetParent` 的上内边距的距离。

**`offsetWidth`**

- 含义：元素的**布局宽度**，包含 `content + padding + border`，但不包含 `margin`。
- 举例：`div { width: 200px; padding: 10px; border: 2px }`
  - `offsetWidth = 200 + 10*2 + 2*2 = 224`

**`offsetHeight`**

- 含义：元素的布局高度（同理，含 `padding + border`）。

**`offsetParent`**

- 含义：用来计算 `offsetLeft` / `offsetTop` 的参照元素。
- 规则：一般是最近的 **有定位属性（position: relative/absolute/fixed）** 的祖先元素，如果都没有就是 `<body>`。





### client

## 🔹 client 系列（可见区域大小，不含滚动条）

- `clientWidth`：内容区 + padding（不含滚动条、边框）。
- `clientHeight`：内容区 + padding（不含滚动条、边框）。
- `clientTop`：元素上边框的厚度。
- `clientLeft`：元素左边框的厚度。





### scroll

##  scroll 系列（可滚动的内容大小 & 滚动距离）

- `scrollWidth`：内容实际宽度（含溢出部分）。
- `scrollHeight`：内容实际高度。
- `scrollLeft`：水平滚动距离。
- `scrollTop`：垂直滚动距离。





# 二. Appheader

## 最外层布局

- ```
  display: flex;
  align-items: center;
  height: 80px;
  
  左边和右边: flex:1
  中间自然就 居中
  ```

  



### 1.1. 左侧的Logo

- svg引入方式 => 封装成组件

  - 注意一: js中 不支持 用 - 来链接两个单词,用驼峰
  - 二: 多个值,要以对象方式保存
    - *style*={cssToObj("display: block; height: 16px; width: 16px; fill: currentcolor;")}

- 项目的主题配置

  - theme => index.js
  - ThemeProvider提供theme
    - 使用 ${props => props.theme.xxx}

- 布局

  ```
   <div className="logo" onClick={handleLogoClick}>
          <IconLogo>
          </IconLogo>
          <span>爱披迎</span>
  </div> 
  
    .logo {
      display: flex;
      align-items: center;
      margin-left: 24px;
      span{
        margin-left: 6px;
        /* 设了fontsize下面图片和文字对齐不了,需要设置line-height和height */
        line-height: 45px;
        height: 39px;
        font-size: 12px;
  }
  ```

  



### 1.2. 右侧的内容

- btns的列表

  - 点击才能出现,点击窗口就消失

  ```
    // 副作用代码: 因为点击窗口任何地方就会关闭面板
    useEffect(() => {
      function windowHandleClick() {
        setShowPanle(false)
      }
      window.addEventListener('click', windowHandleClick, true)
      return () => {
        window.removeEventListener('click', windowHandleClick, true)
        //true: 表示事件侦听器是在捕获阶段注册的。
        //false (或省略): 表示事件侦听器是在冒泡阶段注册的。
      }
    },[])
  ```

  

- Profile

  - 两个svg(两个图片是svg)

- 混入的使用(复用的css代码)

  - theme => mixin

    ```
    先assets/theme/index
     export const theme ={ mixin: {
        boxShadow: `
          transition: box-shadow 0.3s ease;
          &:hover {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
          }
        `
    } }
    
    ------------------------
    index.js
    import theme from './assets/theme';
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    
    
    -------------------
    子组件
    如.global{
        ${props => props.theme.mixin.boxShadow}
    }
    ```

    

- 布局

  - ```
    flex: 1;
    display: flex;
    justify-content: flex-end; (因为默认是靠左)
    
    图片排列的样式(在一个容器里吗)
    <div className="global">
            <IconGlobal/>
    </div>
    .global{
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    ```

    



### 1.3.中间的内容

## 布局(中间是个搜索栏,栏里面有文字和图片)

```
最外层
position: relative;
display: flex;
justify-content: center;

里面套内容外层的框用absolute
    position: absolute;
    top: -20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 345px;
    height: 48px;
    

    		//具体内容
           <div className="text">
            <img src={require('@/assets/img/house.avif')} alt="" />
            <span className='firstItem'>任何地方</span>
            <span>任何时间</span>
            <span className='last'>添加人数</span>
          </div>
           <div className="icon">
            <IconSearch />
          </di
 -------------------------------------------         
          .text{
          
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
                .img { -- 而不是100%,一般设个高就行了
                        width: 48px;
                       height: 48px; 
                }
                span {
                        display: inline-block;
                        border-right: 2px solid #ddd;

                        /* 可以调整后面的划线长度 */
                        padding: 5px 18px;


                         &.last {
                          border-right: none;
                        }
                        &.firstItem {

                          padding-left: 0px;
                        }
                }
                
            }
             .icon { --- 图片外层放个容器包裹
                  width: 32px;
                  height: 32px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
```









# 三. 首页的content

## 布局

```
margin: 0 auto;
width: 1032px
```



### 2.1. 轮播图的图片

- 引入图片的方式

- img/background-image引入

  - import

  - require()函数

    ```
    banner/index.jsx
    import React, { memo } from 'react'
    import { HomeBannerWrapper } from './style'
    
    export default memo(function HomeBanner() {
      return (
        <HomeBannerWrapper>
        </HomeBannerWrapper>
      )
    })
    
    ---------- 
    banner/style.js
    export const HomeBannerWrapper = styled.div`
      height: 529px;
      background: url(${require('@/assets/img/img2.jpg')}) center center / cover no-repeat;
      -- 前两个参数(center center)是图片的位置
      --- / 后面的参数是 图片怎么放 cover全覆盖父元素, contain: 自己全部显示,故不覆盖父元素
    `
    
    ```

    





### 2.2. 高性价比

### 2.2.1. redux请求数据和管理数据





### 2.2.2. 封装SectionHeader

- title
- subtitle

```react
 const { title, subtitle = "" } = props
<div className="title">{title}</div>
<div className="subtitle">{subtitle}</div>  -- 当subtitle是undefined就不会显示,而不是报错

.title {
	margin-bottom : 16 -- 来调整和subtitle的位置
}
```





### 2.2.3. 展示列表的数据 (home-section-v1)

- Roomitem

  - 基本展示
  - 集成UI组件库
    - Material UI
    - Ant Design

  - 使用rating展示

- SectionRoom封装到组件中



```react
<ul>
      roomList?.slice(0, 8).map((item) => {
        return <RoomItem key={item.id} itemData={item} itemWidth={itemWidth} />
      }) 
    }
</ul>

-----------------------
ul {
    display: flex;
    flex-wrap: wrap; --- 换行
    margin: 0 -8px; -------- 让两个图片之间隔出来16px
    li {
      width: 25%;
      padding: 0 8px; --- 和margin相互抵消,最左边和最右边对齐
      margin-bottom: 16px;
    }
  }
	
```

