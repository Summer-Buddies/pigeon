import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Friends from './pages/Friends';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
