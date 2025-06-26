import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { friends } from '../data/staticUsers.js'
import '../components/SidePanel.js'
import SidePanel from '../components/SidePanel.js';
import './Chat.css'

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  
  useEffect(() => {
    const userId = parseInt(id);
    const foundUser = friends.find(u => u.id === userId);
    setUser(foundUser);
  }, [id]);

  useEffect(() => {
    const ws = new WebSocket("ws://18.225.8.151:8000");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.send('is this workinggg')
    };

    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages(prev => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!user) return <div>User not found</div>;

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(input);
      setInput('');
    }
  };

  const dummy = () =>{
    navigate("/")
  }

  return (
    <div className='chat-page'>
      <SidePanel/>
      <div className='main-panel'>
        <h1>Chat page</h1>
        <div>
          <div>
            {messages.map((msg, i) => <div key={i}>{msg}</div>)}
          </div>
          <input
            type="text"
            placeholder='Message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} type="button" className="btn btn-primary ml-2">Send</button>
        </div>
        <button onClick={dummy} type="button" className="btn btn-primary m-4">Login Page</button>
      </div>
    </div>
  )
}

export default Chat
