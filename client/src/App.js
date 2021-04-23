import React, { useContext } from 'react';
import CardGrid from './parts/CardGrid';
import GridHeader from './components/GridHeader';
import Header from './parts/Header';
import './assets/css/App.css';
import UserEditModal from './components/UserEditModal';
import { UserContext } from './contexts/UserContext';
import Pages from './components/Pages';

function App() {
  const [state] = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <GridHeader />
      <CardGrid users={state.users} />
      <Pages page={state.page} last={state.pages} />
      <UserEditModal />
    </div>
  );
}

export default App;
