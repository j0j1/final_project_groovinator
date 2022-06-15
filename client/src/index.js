import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SynthProvider from './components/SynthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SynthProvider>
      <App />
    </SynthProvider>
  </React.StrictMode>
);