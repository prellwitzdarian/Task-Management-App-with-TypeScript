import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const redirectUri =
  import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri, audience }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <TaskProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TaskProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
