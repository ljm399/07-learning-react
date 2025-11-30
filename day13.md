# 一. 全部页面的功能(entire)

### 1.1. 过滤器的功能

- 选中和取消选中





### 1.2. 房间的列表展示

- 在redux中保存数据

  - currentPage
  - roomList
  - totalCount
- 如何根据currentPage获取数据

  - dispatch(函数) => redux-thunk




### 样式

```react
  const onePicEl = (
     <div className="cover">
        <img src={itemData.picture_url} alt="" />
    </div> 
  )
  const sliderEl = (...)
                    
<RoomItemWrapper>
     { !itemData.picture_urls ? onePicEl: sliderEl}-- 图片
    <div className="desc">
            <div className="message">{itemData.verify_info.messages.join(" · ")}</div>
            <div className="title">{itemData.name}</div>
            <div className="price">¥{itemData.price}/晚</div>
     </div>
 </RoomItemWrapper>
 
 -------------------------------------
 export const RoomItemWrapper = styled.div`
    // 排列技巧: 父元素记得margin: 0 -8px;
    box-sizing: border-box;
    width: ${props => props.$itemWidth};
    padding: 0 8px;
    margin-bottom: 16px;
    
 	    .cover {
        padding-top: 60%; -- 因为.cover是块元素,宽度100% 故上边距其是60%(比如 .cover 的宽度是 100px，那么它的 padding-top 就是 60px。)
        
        position: relative;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          // 使图片不被压缩
          object-fit: cover;
        }
      }
      
       .desc {
      .message {
        color: ${props => props.theme.textColor.primaryColor};
        font-size: 12px;
        margin: 5px 0;
      }
      .title {
        height: 40px;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 8px;

        // 设置2行
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.3;
        max-height: calc(1.3em * 2);
      }
      .price {
        font-size: 14px;
      }
```







### 1.3. 分页器展示和交互

- 如何修改UI组件库的样式

  - sz ={{  fontSize: "12px",

    ​    color: `${itemData.star_rating_color}`
  - }}

- 分页数据个数和展示的小算法
  - 总页数: Math.cell(totalCount / 20)
  - start: (currentPage * 20) + 1
  - end: (currentPage + 1) * 20

- 页码改变
  - 获取最新的页码:  dispatch



### 样式

```
<EntirePaginationWrapper>
    <div className="pagination">
       .....
        <span className="desc">
          第{startCount} - {endCount}个房源，共{totalCount}个房源
        </span>
      </div>
  
  ------------------- 
export const EntirePaginationWrapper = styled.div`  
  display: flex;
  justify-content: center;
  margin-top: 20px;
  // 使元素内容居中,而非本身
  text-align: center;
 .pagination {
 		.....
 }
	
```







# 二.轮播图展示

### 2.1. AnDesign Carousel







### 2.2. 上一个和下一个







### 2.3. 自定义指示器Indicator

- selectIndex, 居中显示
- 指示器的点效果



```react
 <div className="swiper">
    <div className="control">
      <div className="btn left" onClick={e => controlClick(false,e)}>
        <LeftOutlined style={{ fontSize: '40px', color: "rgba(255, 255, 255, 0.6)" }} />
      </div>
      <div className="btn right" onClick={e => controlClick(true,e)}>
        <RightOutlined style={{ fontSize: '40px', color: "rgba(255, 255, 255, 0.6)" }} />
      </div>
    </div>
    <Carousel dots={false} ref={carouselRef}>
      {
        itemData?.picture_urls?.map((item, index) => {
          return (
            <div className="cover" key={index} >
              <img src={item} alt="" />
            </div>
          )
        })
      }
    </Carousel>
    <div className="indicator">
      <Indicator selectIndex={index}>
        {
          itemData?.picture_urls?.map((item, curIndex) => {
            return (
              <div className='item-dot' key={item}>
                <span className={classNames("dot", {
                  active: index === curIndex,
                  secondary: Math.abs(index - curIndex) === 1,
                  third: Math.abs(index - curIndex) === 2,
                  
                })}></span>
              </div>
            )
          })
        }
      </Indicator>
    </div>
  </div>
  

.swiper {
      position: relative;
      cursor: pointer;
      &:hover {
        .control {
          display: flex;
        }
      }
      >.control {
        display: none;
        justify-content: space-between;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 9;
         >.btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 100%;
          background: linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.2) 100%);

          &.right {
            background: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
          }
         
         }
        
       
      }
      .cover {
        padding-top: 60%;
        position: relative;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          // 使图片不被压缩
          object-fit: cover;
        }
    }
      .indicator {
        position: absolute;
        z-index: 9;
        width: 100px;  
        

        // 居中公式之一
        left: 0;
        right: 0;
        bottom: 10px;
        margin: 0 auto;

        .item-dot {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;

          // 那个点从中间开始大小逐渐递减:样式
          .dot {
            width: 6px;
            height: 6px;
            background-color: #fff;
            border-radius: 50%;
            transition: all 0.2s ease;
            &.secondary {
              width: 8px;
              height: 8px;
            }
            &.third {
              width: 4px;
              height: 4px;
            }
            &.active {
              width: 12px;
              height: 12px;
            }
          }
        }
        
      }
    }
```





# 三. 点item调到详细

- item的点击 =>(传递到父组件entire) entire中监听点击 => 跳转到详细
- item的数据保存detail redux中
- detail中获取数据
- detail-pictures组件展示图片