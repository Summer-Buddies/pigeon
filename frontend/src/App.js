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


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
