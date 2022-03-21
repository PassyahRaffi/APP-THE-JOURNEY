import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  ModalRegisterProvider,
  ModalLoginProvider,
  LoginContextProvider,
} from "./context/context";
import { UserProvider } from "./context/userContext";
import App from "./App";

import "./index.css";

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
