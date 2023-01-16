import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import loginReducer from "./store/LoginSlice";


// redux store
const store = configureStore({
  reducer: {
    loginUser: loginReducer,
  },
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

export { store };
