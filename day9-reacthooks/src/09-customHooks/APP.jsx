import React, { memo } from 'react'
import { useLocalStorage } from './hooks'
// import useLocalStorage from './hooks/useLocalStorage'

export default memo(function APP() {
  const [token, setToken] = useLocalStorage('token');
  function setTokenHandler() {
    setToken('1234567890');
  }

  const [avatarUrl, setAvatarUrl] = useLocalStorage('avatarUrl');
  function setAvatarUrlHandler() {
    setAvatarUrl('https://codecao.com');
  }

  return (
    <div>
      <h1>token: {token}</h1>
      <button onClick={setTokenHandler}>设置token</button>

      <h1>avatarUrl: {avatarUrl}</h1>
      <button onClick={setAvatarUrlHandler}>设置avatarUrl</button>
    </div>
  )
})
