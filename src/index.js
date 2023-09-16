import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';

import './index.css';
import Router from "./router.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);