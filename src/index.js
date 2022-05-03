import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routers/AppRouter';
import './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <AppRouter />
  </div>
);
