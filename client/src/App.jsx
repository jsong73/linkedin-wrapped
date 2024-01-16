import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');

  const linkedInLogin = async () => {
    // Open LinkedIn login window
    window.open("http://127.0.0.1:5173/callback/linkedin", "_self");
  };

  return (
    <div>
      <button onClick={linkedInLogin}>LinkedIn Login</button>
      <br />
      <label>Token:</label>
      <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
      <button onClick={getInfo}>Get User Info</button>
    </div>
  );
}

export default App;