# 一. 图片浏览器

### 1.1. 展示浏览器





### 1.2. 关闭的功能





### 1.3. 图片的切换





### 1.4. 图片的预览(列表)



### 外部样式

```
<DetailPicWrapper>
      <div className="pictures">
      
        <div className="left" onClick={e => setShowBrowser(true)}>

          {/* onClick事件放在img组件中就会无效 */}
          {/* 原因: CSS 样式问题：.cover div 可能覆盖了整个区域，阻止了点击事件
              z-index 层级问题：cover 元素可能在上层，拦截了点击事件
              pointer-events 被禁用：CSS 中可能设置了 pointer-events: none */}
            
          <img src={detailInfo?.picture_urls?.[0]} alt="" />
          <div className="cover"></div>
        </div>
        
        <div className="right">
          {
            detailInfo?.picture_urls?.slice(1, 5).map(item => {
              return (
                <div className="item" key={item} onClick={e => setShowBrowser(true)}>
                  <img src={item} alt="" />
                  <div className="cover"></div>
                </div>
              )
            })
          }
        </div>
        <div className="show-btn" onClick={e => setShowBrowser(true)}>显示图片</div>
    	{showBrowser && <PictureBrowser closeBrowser={closeBrowser} pictureUrls={detailInfo?.picture_urls}>				</PictureBrowser>}
      </div>

</DetailPicWrapper>

import styled from "styled-components";
export const DetailPicWrapper = styled.div`
  .pictures {
    display: flex;
    flex-shrink: 0;
    position: relative;
  
    .left {
      width: 50%;
      height: 600px;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.2);
        opacity: 0;
        transition: opacity 200ms ease;
      }

      &:hover {
        .cover {
          opacity: 1;
        }
        img {
          transform: scale(1.1);
          transition: all 200ms ease;
        }
      }
    }
    .right {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      height: 600px;

      >.item {
        box-sizing: border-box;
        border: 1px solid #000;
        width: 50%;
        height: 50%;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        img {
    	// 不一定要absolute
          width:100%;
          height: 100%;
          object-fit: cover;
        }
		
		// 覆盖层
        .cover {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: rgba(0,0,0,.2);
          opacity: 0;
          transition: opacity 200ms ease;
        }

        &:hover {
          .cover {
            opacity: 1;
          }
          img {
              // 悬浮放大
            transform: scale(1.1);
            transition: all 200ms ease;
          }
        }
      }
    }

    .show-btn {
      position: absolute;
      right: 20px;
      bottom: 20px;
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 10px;
      font-size: 14px;
      color: #222;
      cursor: pointer;
    }
  }

`
```



### 图片浏览器

```
<PictureBrowserWrapper>
      <div className="top">
        <div className="close-btn" onClick={e => closeBtnClickHandle()}>
        </div>
      </div>
      <div className="slider">
        <div className="control">
          <div className="btn left" onClick={e => controlClick(false)}>
          </div>
          <div className="btn right" onClick={e => controlClick(true)}>
          </div>
        </div>

        <div className="picture">
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={pictureUrls[curIndex]}
              classNames="pic"
              timeout={300}
              nodeRef={nodeRef}
            >
              {/* CSSTransition中一定要加nodeRef原因 */}
              {/* 
                旧方式（使用 findDOMNode）:
                CSSTransition 内部 → 调用 findDOMNode() → 遍历组件树 → 找到 DOM 节点 → 应用 CSS 类

                新方式（使用 nodeRef）:
                CSSTransition 内部 → 直接使用 nodeRef.current → 应用 CSS 类
              */}

              <img ref={nodeRef} src={pictureUrls[curIndex]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>

      </div>
      <div className="preview">
        <div className="info">
          <div className="desc">
            <div className="count">
              <span>{curIndex + 1} / {pictureUrls.length}</span>
              <span>room apartment图片{curIndex+1}</span>
            </div>
            <div className="toggle" onClick={e => setShowList(!showList)}>
              <span>{showList ? '隐藏' : '显示'}图片列表</span>
              {showList ? <CaretDownOutlined /> : <CaretUpOutlined />}
            </div>
          </div>
          <div className="pic-list">
            <Indicator selectIndex={curIndex}>
              {
                pictureUrls.map((item, index) => {
                  return (
                    <div
                      className={`item ${index === curIndex ? 'active' : ''}`}
                      key={item}
                      onClick={e => picClickHandle(index)}
                    >
                      <img src={item} alt="" />
                    </div>
                  )
                })
              }
            </Indicator>
          </div>
        </div>
      </div>
    </PictureBrowserWrapper>
    
    
    ----------------------------------------------
import styled from "styled-components";
export const PictureBrowserWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;

  >.top {
    position: relative;
    height: 80px;

    >.close-btn {
      position: absolute;
      right: 25px;
      top: 15px;
      cursor: pointer;
    }
  }

  .slider {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;

    .control {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 100%;
        cursor: pointer;
      }
    }

    .picture {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 105vh !important;

      img {
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        user-select: none;
      }
    }
  }

  .preview {
    display: flex;

    // 因为宽度都一样,所有和并列元素居中,且位置一样
    justify-content: center;
    height: 100px;
    margin-top: 10px;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: end;
      width: 100%;
      max-width: 105vh;


      .desc {
        display: flex;
        justify-content: space-between;
        align-items: center;


        .toggle {
          display: flex;
          align-items: center;
          cursor: pointer;

          span {
            color: #fff;
            font-size: 14px;
            margin-right: 5px;
          }

        }
      }

      .pic-list {
        overflow: hidden;
        margin-top: 3px;
        display: flex;
        height: ${props => props.showList ? '70px' : '0'}; // 图片列表的高度，用于控制图片列表的过渡动画
        transition: height 200ms ease; // 图片列表的过渡动画

        .item {
          margin-right: 3px;
          flex-shrink: 0;
          cursor: pointer;

          img {
            // 给图片设个高,让其宽度自适应
            height: 67px;
            opacity: 0.5;
            transition: opacity 200ms ease;
            user-select: none;
          }

          &:hover img {
            opacity: 1;
          }

          &.active img {
            opacity: 1;
          }
        }
      }
    }
  }
`
```





# 二.AppHeader切换

### 2.1. fixed功能

```
&.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
```







### 2.2. 搜索和非搜索切换

- 搜索布局变成
- 搜索和非搜索切换
- 动画的效果
- 滚动让搜索框效果





### 2.3.透明度的显示效果



### 样式

```react
 <HeaderCenterWrapper>
      <CSSTransition
        in={isSearch}
        timeout={300}
        classNames="search"
        unmountOnExit
      >
        <div className="search-detail">
          <SearchTabs value={value} setValueHandle={(newValue) => setValue(newValue)} titles={titles}></SearchTabs>
          <div className="infos">
            <SearchSections value={value} searchData={SearchTitles[value].searchInfos}></SearchSections>
          </div>
        </div>
      </CSSTransition>

      {/* in={!isSearch} 是把一个布尔值传给 CSSTransition 的 in 属性，用来控制“进入/离开”动画以及是否挂载。
      不是必须传 true。传 true 触发“进入”状态（显示并执行 enter 动画）；传 false 触发“离开”状态（执行 exit 动画，配合 unmountOnExit 会卸载 DOM） */}
  <CSSTransition
    in={!isSearch}
    timeout={300}
    classNames="bar"
    unmountOnExit
  >
    <div className="search-bar" onClick={searchBarClickHandle}>
 		....
    </HeaderCenterWrapper>
    
------------------------------------------
	这里search-bar不显示,因为前面有,但会有其和search-detail两者之间的切换效果
      
  切换效果样式: 有CSSTransition的属性in完成的,下面是过渡效果
       .search-exit {
    transform: scale(1.0) translateY(0);
    opacity: 1;
  }

  .search-exit-active {
    transform: scale(0.35, 0.727273) translateY(-58px);
    opacity: 0;
   ............ .search就是classNames的值
  -------------------------------------------------------- 
   
   
   
 .search-detail {
    position: relative;
    
    .infos {
      position: absolute;
      top:70px;
      left: 50%;
      transform: translateX(-50%); /* 使其居中 */
      background-color: ${props => props.theme.topAlpha ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)'};
      border-radius: 24px;
      border: 1px solid ${props => props.theme.topAlpha ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)'};
    }
  }
  
SearchTabs 这个mui/material导入的组件组件样式都是浏览器中选中,然后赋值其className 如 .MuiButtonBase-root 
      
 
SearchSections样式
export const SectionWrapper = styled.div`
  /* 最外层容器使用 flex 布局，水平排列各个 CustomTabPanel */
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  ....
    
```







# 三. 自动化部署

### 3.1. 先购买服务器和Nginx环境的搭建

**Nginx作用：高性能的 Web 服务器和反向代理服务器**

- **主要功能**
  
  1. **静态资源托管**：把前端 React/Vue 项目的 `build` 文件夹放进去，用户访问网站时，Nginx 就把 `index.html`、CSS、JS 静态文件返回给浏览器。
  2. **反向代理**：用户访问 `http://example.com/api`，Nginx 可以把请求转发到后端（比如 Node.js、Spring Boot、Go 服务）。
  3. **负载均衡**：如果有多个后端服务，Nginx 可以分发请求，提升并发性能。
  4. **HTTPS 配置**：通过 SSL 证书让网站支持 `https://`。
  
-  CentOS安装命令

  ```bash
  # 安装 Nginx
  sudo yum install -y nginx
  
  # 启动 Nginx
  sudo systemctl start nginx
  
  # 设置开机自启
  sudo systemctl enable nginx
  
  # 查看运行状态
  sudo systemctl status nginx
  ```

  Ubuntu安装命令

  ```bash
  # 更新软件源
  sudo apt update
  
  # 安装 Nginx
  sudo apt install -y nginx
  
  # 启动 Nginx
  sudo systemctl start nginx
  
  # 设置开机自启
  sudo systemctl enable nginx
  ```


#### 配置 Nginx

编辑 Nginx 配置文件：

```bash
sudo vim /etc/nginx/conf.d/vueplustypescript.conf
```

配置内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或服务器 IP

    # 前端静态资源目录
    root /var/www/vueplustypescript/dist;
    index index.html;

    # 支持 Vue Router 的 history 模式
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 反向代理 API 请求到后端
    location /api/ {
        proxy_pass http://localhost:8000;  # 替换为你的后端服务地址
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 静态资源缓存配置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

重启 Nginx：

```bash
sudo nginx -t  # 测试配置文件
sudo systemctl reload nginx  # 重新加载配置
```



### 3.2. Jenkins环境的搭建 -- 需要java环境

- 安装java

  - ```bash
    # CentOS
    sudo yum install -y java-11-openjdk java-11-openjdk-devel
    
    # Ubuntu
    sudo apt install -y openjdk-11-jdk
    
    # 验证安装
    java -version
    ```
- 安装jenkins

  - linus清空： clear
  - 安装步骤：

    ```bash
    # 添加 Jenkins 仓库
    sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
    sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
    
    # 安装 Jenkins
    sudo yum install -y jenkins
    
    # 启动 Jenkins
    sudo systemctl start jenkins
    
    # 作用：自动启动
    sudo systemctl enable jenkins
    
    # 查看初始密码
    sudo cat /var/lib/jenkins/secrets/initialAdminPassword
    ```

- **作用：自动化构建和持续集成/持续部署（CI/CD）工具**
  - **主要功能**
    1. **拉取代码**：从 GitHub、GitLab 等仓库获取最新代码。
    2. **自动构建**：执行 `npm install && npm run build`（前端），或 `mvn package`（Java），或 `go build`（Go）等。
    3. **自动测试**：在构建时跑单元测试、集成测试。
    4. **自动部署**：构建成功后，把产物（如 `build` 文件夹、jar 包）推送到服务器指定目录。
       1. **持续集成/持续部署**：当你 `git push` 代码时，Jenkins 可以自动触发构建和部署，不用你手动一遍遍操作



### 3.3. jenkins的使用过程

- 配置jenkins的环境

1. 你在本地写代码 `git push` 到 GitHub

2. Jenkins 自动拉取代码 → 构建出 `build` 文件夹

3. Jenkins 把 `build` 放到 Nginx 的目录里

4. 用户访问网站时，Nginx 把页面返回


- #### 安装 Node.js 环境

  Jenkins 构建需要 Node.js 环境：

  - jenkins有可视化界面

  ```bash
  # 安装 nvm（Node 版本管理工具）
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  
  # 加载 nvm
  source ~/.bashrc
  
  # 安装 Node.js
  nvm install 20
  nvm use 20
  
  # 验证安装
  node -v
  npm -v
  ```

  ---





### 3.4. 手动部署和自动化部署

***\*流程图：\****

本地开发 → git push → GitHub → Webhook → Jenkins

​                      ↓

​                   拉取代码 → 安装依赖

​                      ↓

​                    构建项目 → 上传服务器

​                      ↓

​                    Nginx 托管 → 用户访问

\```



### 3.5. 总结所有的操作顺序（ABC为顺序）

#### A.本地vscode里面 安装remote插件，用其连接远程服务器

#### B.选择linus，vscode终端就是远程服务器的终端，这个终端下载Nginx

#### C.然后继续在那个终端安装java环境和jenkins

#### D.jenkins可能安装不了，因为找不到对应包，下面要手动添加对应仓库

#### E. 然后去服务器配置安全策略（配置端口），之后访问服务器地址加端口就可以看见jenkins

#### F. 会看到要密码才能登录，前面有段路径，赋值，然后再刚刚那个终端执行： cat 那个路径，然后返回一个密钥就是密码

#### G. 进入后选择安装推荐插件

#### H. 先在那个终端执行pwd ，看当前路径，再 mkdir 文件夹名（你打包那个包名），ls 看文件包名创建了吗，

#### I.终端那个页面有个打开文件夹，点击打开刚刚创建的文件夹,把打包好那个文件夹里面的文件复制到刚刚打开的文件夹里面

#### J.配置ngnix，可以去问ai，概况就是在nginx.conf里面配置好：作用：即使打开服务器网站不是jenkins默认页面，而是你的页面

#### L. 执行Systemcl restart nginx 重启

#### M. 访问服务器，进入jenkins，配置node，需要安装；配置仓库github，要是仓库不是开源则配置协议

#### N.在jenkins服务器里面配置构建时间和 git push那些自动部署代码，当构建失败，可能要回到刚刚那个终端配置root权限







