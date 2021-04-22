import React, { useState } from 'react';
import CardGrid from './parts/CardGrid';
import GridHeader from './components/GridHeader';
import Header from './parts/Header';
import './assets/css/App.css';
import { ModalProvider } from './contexts/ModalContext';
import UserEditModal from './components/UserEditModal';

function App() {
  const [users] = useState([]);
  return (
    <div className="App">
      <ModalProvider>
        <Header />
        <GridHeader />
        <CardGrid users={users} />
        <UserEditModal />
      </ModalProvider>
    </div>
  );
}

export default App;
