import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router.tsx";
import { BrowserRouter } from "react-router-dom";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
