import { useState, useEffect } from 'react'
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

  return (
    <div className='chat-page'>
      <SidePanel/>
      <div className='main-panel'>
        <div className='header'>{user.name}</div>
          <div className='message-history'>
            {messages.map((msg, i) => <div key={i}>{msg}</div>)}
          </div>
          <div className='message'>
            <input
              type="text"
              placeholder='Message...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className='text-message'
            />
            <div className='icons'>
              <button onClick={sendMessage} type="button" className="btn ml-2">
                <img src='/send.png' alt='send' className='send-icon'/>
              </button>
              <img src='/share.png' alt='share' className='share-icon'></img>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Chat
