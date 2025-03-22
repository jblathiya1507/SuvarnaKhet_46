import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/HomePage/HomePage";
import ShopPage from "./components/ShopPage/ShopPage";
import ProductDetails from "./components/ProductDetailsPage/ProductDetails";
import "./app.css";
import Signup from "./components/UserAuth/SignUp";
import Login from "./components/UserAuth/Login";
import Profile from "./components/Navbar/Profile";
import Cart from "./components/Carts/Carts";
import Product from "./components/Product/Product"
import Checkout from "./components/CheckOut/CheckOut";
import Historyy from "./components/Historyy/Historyy";
import SellRequests from "./components/Farmer/SellRequests/SellRequests";
import ManageSelling from "./components/Farmer/ManageSelling/ManageSelling";
import FProfile from "./components/Farmer/Profile/Profile"; // Import Profile Page
import FarmerDashboard from "./components/Farmer/Dashboard/FarmerDashboard";

import Dashboard from "./components/Admin/sidemenus/Dashboard";
import ManageSellRequests from "./components/Admin/sidemenus/ManageSellRequests";
import ProfileApproval from "./components/Admin/sidemenus/ProfileApproval";
import DeliveryPartnerApprove from "./components/Admin/sidemenus/DeliveryPartnerApprove";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productName" element={<ProductDetails/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<Historyy />} />
        </Route>

        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/sellrequests" element={<SellRequests />} />
        <Route path="/farmer/manageselling" element={<ManageSelling />} />
        <Route path="/farmer/profile" element={<FProfile />} />{" "}
      
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/managesellrequests" element={<ManageSellRequests />} />
        <Route path="/admin/profileapproval" element={<ProfileApproval />} />  
        <Route path="/admin/deliverypartnerapproval" element={<DeliveryPartnerApprove />} />  
      </Routes>
    </Router>
  );
}

export default App;