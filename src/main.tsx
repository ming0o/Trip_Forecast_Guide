import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter 사용
import App from './App';
import './index.css';

// eslint-disable-next-line react/no-render-return-value
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
