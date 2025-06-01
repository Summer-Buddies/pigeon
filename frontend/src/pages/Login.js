import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const dummy = () =>{
        navigate("/chat")
    }
  return (
    <div>
      <h1>login page</h1>
      <button onClick={dummy} type="button" class="btn btn-primary">Chat</button>
    </div>
  )
}

export default Login
