import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import {CollapseDrawerProvider} from "./context/CollapseDrawerContext";
import {StoreProvider} from "./context/StoreContext";
import {AlertProvider} from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <AlertProvider>
          <BrowserRouter>
            <CollapseDrawerProvider>
              <App/>
            </CollapseDrawerProvider>
          </BrowserRouter>
        </AlertProvider>
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
