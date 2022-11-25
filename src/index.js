import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { nodeServerApi } from "./store/user/serverApiSlice";
import { ToastContainer } from "react-toastify";
import Navbar from "./subcomponents/Navbar";
import store from "./store/store";
import "./base.scss";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/math">
    <Provider store={store}>
      <AuthProvider>
        <ApiProvider api={nodeServerApi}>
          <Navbar />
        </ApiProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
