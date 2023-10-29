import React from "react";
import axios from 'axios'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

axios.defaults.baseURL = 'https://api.abdullajonov.uz/adras-market-api/api'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
