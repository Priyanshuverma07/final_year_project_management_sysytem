import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <AppRoutes />
        <Footer />
    </AuthProvider>
  </BrowserRouter>
);

