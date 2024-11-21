import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/footer.jsx";

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <Home />
      <Footer />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
