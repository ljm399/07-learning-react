import React, { memo } from 'react'
import { useUserToken } from './hooks'

const Home = memo(function Home() {
  const { user, token } = useUserToken();
  
  return <h1>Home: {user.name} {token.token}</h1>
})

export default memo(function APP() {
  const { user, token } = useUserToken();
  return (
    <div>
      <h2>User: {user?.name}</h2>
      <h2>Token: {token?.token}</h2>
      <Home />
    </div>
  )
})
