import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18next'; 
import {CarProvider} from './context/carContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CarProvider>
  <App />
</CarProvider>
 /*  <React.StrictMode>
    <App />
  </React.StrictMode>, */
)
