import React from 'react'
import { useNavigate } from 'react-router-dom'


const Chat = () => {
    const navigate = useNavigate()
    const dummy = () =>{
        navigate("/")
    }
  return (
    <div>
      <h1>Chat page</h1>
      <button onClick={dummy} type="button" className="btn btn-primary">Login</button>
      </div>
  )
}

export default Chat
