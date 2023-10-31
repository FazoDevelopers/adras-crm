import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

// import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://api.abdullajonov.uz/adras-market-api/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
