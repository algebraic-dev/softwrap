import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { ModalProvider } from './contexts/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
