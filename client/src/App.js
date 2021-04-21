import React, { useState } from 'react';
import CardGrid from './components/CardGrid';
import './assets/css/App.css';

function App() {
  const [users] = useState([]);
  return (
    <div className="App">
      <CardGrid users={users} />
    </div>
  );
}

export default App;
