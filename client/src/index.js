import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  LoginContextProvider,
  ModalLoginProvider,
  ModalRegisterProvider,
} from "./context/context";
import { UserProvider } from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalRegisterProvider>
        <ModalLoginProvider>
          <LoginContextProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </LoginContextProvider>
        </ModalLoginProvider>
      </ModalRegisterProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
