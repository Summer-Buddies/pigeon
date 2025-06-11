import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;