import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState([]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    const response = await fetch(`https://api.github.com/search/users?q=${username}`);
    const data = await response.json();
    setUserData(data.items);
  };

  return (
    <div className="container">
      <h1>Github User Search</h1>
      <div className="search-container">
        <input type="text" value={username} onChange={handleChange} placeholder="Enter a GitHub username" />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results-container">
        {userData.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt="Get better internet fool" />
            <div className="user-info">
              <a href={user.html_url}><h3>{user.login}</h3></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
