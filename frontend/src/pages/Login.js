import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);

      //Get the ID token
      const idToken = await userCredential.user.getIdToken();
      console.log("ID Token:", idToken);

      //Example: send token to backend
      const response = await fetch("http://3.14.4.195:8000/secure-route", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
      const data = await response.json();
      console.log("Backend response:", data);

      //Navigate to the chat page on success
      navigate('/chat');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className='auth-page'>
      <h1 className='auth-title'>Pigeon</h1>
      
      <div className='auth-box'>
        <div className='auth-form'>
          <form onSubmit={handleLogin}>
            
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input-box'
            />
            
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='input-box'
            />

            <div className='auth-submission'>
              <button type="submit" className="button orange-button">Login</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className='auth-text'>
                Don't have an account? <a href="/signup">Sign Up</a>
              </div>
            </div>
          </form>
        </div>
        <div className='mascot'>
          <img src='pigeon.png' alt='pigeon mascot'/>
        </div>
      </div>
    </div>
  );
};

export default Login;