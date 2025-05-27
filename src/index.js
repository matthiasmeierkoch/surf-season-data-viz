import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <App className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-sky-900 flex flex-col items-center justify-start px-2 sm:px-4"/>
  </React.StrictMode>
);

reportWebVitals();
