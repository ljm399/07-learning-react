/* eslint-disable react-hooks/rules-of-hooks */

import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'

function HYRouter(Component) {
  return function(props) {
    // 1. 导航
    const navigate = useNavigate()

    // 2. 动态路由的参数: id
    const params = useParams()

    // 3. 查询字符串的参数: /user?name=codecao&age=23
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams)

    // 4. 获取当前的路径
    const location = useLocation()
    const pathname = location.pathname

    const router = { navigate, params, query, pathname } 
    return <Component {...props} router={router} />
  }
}
/* eslint-enable react-hooks/rules-of-hooks */

export default HYRouter

// 这种模式在 React Hooks 早期是很常见的写法，现在主要是工具链变得更严格了
// 现在这样命名后，ESLint 应该能识别 WithRouter 是一个组件


// 方式一: 上面那个不是注释 ,ESLint 解析器会读取所有注释
// 识别特定格式（以 eslint- 开头的注释
// 作用:降低 ESlint的严格程度, 让代码通过检查(把errro变为warn)

// 方式二可以在 package.json 中添加配置
// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// }
