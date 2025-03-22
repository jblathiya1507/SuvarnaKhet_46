import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      
        <Outlet /> {/* This is where the current page (Dashboard, Sell Requests, etc.) will render */}
      </div>
     
  );
};

export default Layout;
