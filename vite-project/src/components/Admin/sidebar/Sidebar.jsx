import React, { useState } from "react";
import { Button } from "primereact/button";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const currentPath = location.pathname;

  // Sidebar menu items
  const items = [
    { label: "Dashboard", icon: "pi pi-home", route: "/admin/dashboard" },
    {
      label: "Sell Requests",
      icon: "pi pi-shopping-cart",
      route: "/admin/managesellrequests",
    },
    { label: "Farmer Profile Approval", icon: "pi pi-user", route: "/admin/profileapproval" },
    { label: "Delivery Partner Approval", icon: "pi pi-user", route: "/admin/deliverypartnerapproval" },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("uf_id");
        // Perform logout action (e.g., clear session, token, etc.)
        Swal.fire("Logged out!", "You have been logged out.", "success");
        // Redirect to login or home page after logout (optional)
        navigate("/admin/login"); // Replace with your desired route
      }
    });
  };

  return (
    <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar header */}
      <div className="sidebar-header">
        {!isSidebarCollapsed && <h2 className="sidebar-title">LOGO</h2>}
        <Button
          icon={
            isSidebarCollapsed
              ? "pi pi-angle-double-right"
              : "pi pi-angle-double-left"
          }
          className="toggle-button"
          style={{ color: "white" }}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Sidebar menu */}
      <ul className="sidebar-menu">
        {items.map((item) => (
          <li
            key={item.route}
            className={`menu-item ${currentPath === item.route ? "active-menu" : ""}`}
            onClick={() => navigate(item.route)}
          >
            <div className="menu-icon">
              <i className={`pi ${item.icon}`} />
            </div>
            {!isSidebarCollapsed && (
              <span className="menu-text">{item.label}</span>
            )}
          </li>
        ))}
      </ul>

      {/* Logout button */}
      <div className="logout-button-container">
        <Button
          label={isSidebarCollapsed ? "" : "Logout"}
          icon="pi pi-sign-out"
          className="logout-button"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;

// CSS in JS:
const styles = `
  /* Sidebar Container */
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: #316731;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: width 0.3s ease-in-out;
  }

  .sidebar.collapsed {
    width: 80px;
  }

  /* Sidebar Header */
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
  }

  .sidebar-title {
    font-size: 22px;
    font-weight: bold;
    color: white;
    margin-left: 10px;
  }

  /* Toggle Button */
  .toggle-button {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  .sidebar-menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 5px;
    color: white;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }

  .menu-item .menu-icon {
    margin-right: 10px;
  }

  .menu-item:hover {
    background: #4CAF50;
    color: black;
  }

  .menu-item.active-menu {
    background:#4CAF50;
    color: black;
  }

  .menu-item.active-menu .menu-icon {
    color: black;
  }

  .sidebar.collapsed .sidebar-title {
    display: none;
  }

  .sidebar.collapsed .menu-text {
    display: none;
  }

  .sidebar.collapsed .menu-icon {
    margin-right: 0;
    font-size: 24px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /* Logout Button */
  .logout-button-container {
    margin-top: auto;
    padding: 10px;
  }

  .logout-button {
  border:2px solid white;
    width: 100%;
    background: transparent;
    color: white;
    border-radius: 5px;
  }

  .logout-button:hover {
    background: white;
    color: black;
  }
`;

// Inject the styles into the page
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

