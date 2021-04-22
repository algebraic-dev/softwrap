import React, { useContext } from 'react';
import CardGrid from './parts/CardGrid';
import GridHeader from './components/GridHeader';
import Header from './parts/Header';
import './assets/css/App.css';
import UserEditModal from './components/UserEditModal';
import { UserContext } from './contexts/UserContext';

function App() {
  const [users] = useContext(UserContext);

  return (
    <div className="App">
      <Header />
      <GridHeader />
      <CardGrid users={users} />
      <UserEditModal />
    </div>
  );
}

export default App;
