import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoginModalProvider } from "./context/LoginModalContext";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoginModalProvider>
          <App />
          <Toaster position="top-right" />
        </LoginModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
