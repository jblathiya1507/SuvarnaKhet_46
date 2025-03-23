import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Chatbox from "../ChatBot/ChatBot";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Chatbox/>
      <Outlet /> {/* This will dynamically render the child routes */}
      <Footer />
    </div>
  );
}
