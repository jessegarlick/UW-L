import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store
import App from './App.jsx';
import './index.css';

// Combine everything into one component setup
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App in the Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);
