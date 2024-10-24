/* eslint-disable */
import React from "react";
import { createRoot } from 'react-dom/client';

import App from './App'
import "./assets/css/App.css";
import "./assets/css/Notfound.css";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/css/Spinner.css";
import "./assets/css/Pagination.css";

const container = document.getElementById('app-root');
const root = createRoot(container);

root.render(
  <App />
);