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

import FLogin from "./components/Farmer/FarmerAuth/Login";
import FSignup from "./components/Farmer/FarmerAuth/Signup";
import SellRequests from "./components/Farmer/SellRequests/SellRequests";
import ManageSelling from "./components/Farmer/ManageSelling/ManageSelling";
import FProfile from "./components/Farmer/Profile/Profile"; // Import Profile Page
import FarmerDashboard from "./components/Farmer/Dashboard/FarmerDashboard";

import ALogin from "./components/Admin/login/Login";
import Dashboard from "./components/Admin/sidemenus/Dashboard";
import ManageSellRequests from "./components/Admin/sidemenus/ManageSellRequests";
import ProfileApproval from "./components/Admin/sidemenus/ProfileApproval";
import DeliveryPartnerApprove from "./components/Admin/sidemenus/DeliveryPartnerApprove";

import ManageFarmers from "./components/SuperAdmin/ManageFarmers/ManageFarmers";
import ManageAdmin from "./components/SuperAdmin/ManageAdmin/ManageAdmin";
import ManageDelivery from "./components/SuperAdmin/ManageDelivery/ManageDelivery";
import ManageWarehouses from "./components/SuperAdmin/ManageWherhouse/ManageWarehouse";

import ManagePickup from "./components/Delivery/ManagePickup/ManagePickup";
import DManageDelivery from "./components/Delivery/ManageDelivery/ManageDelivery";
import DProfile from "./components/Delivery/Profile/Profile";
import DLogin from "./components/Delivery/Auth/Login";
import DSignup from "./components/Delivery/Auth/Signup";


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

        <Route path="/farmer/signup" element={<FSignup />} />
        <Route path="/farmer/" element={<FLogin />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/sellrequests" element={<SellRequests />} />
        <Route path="/farmer/manageselling" element={<ManageSelling />} />
        <Route path="/farmer/profile" element={<FProfile />} />{" "}
      
        <Route path="/admin/" element={<ALogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/managesellrequests" element={<ManageSellRequests />} />
        <Route path="/admin/profileapproval" element={<ProfileApproval />} />  
        <Route path="/admin/deliverypartnerapproval" element={<DeliveryPartnerApprove />} />  

        <Route path="/superadmin/managefarmers" element={<ManageFarmers />} />
        <Route path="/superadmin/" element={<ManageAdmin />} />
        <Route path="/superadmin/managedelivery" element={<ManageDelivery />} />
        <Route path="/superadmin/managewarehouses" element={<ManageWarehouses />} />

        <Route path="/delivery/signup" element={<DSignup />} />
        <Route path="/delivery/" element={<DLogin />} />
        <Route path="/delivery/managepickup" element={<ManagePickup />} />
        <Route path="/delivery/managedelivery" element={<DManageDelivery />} />
        <Route path="/delivery/profile" element={<DProfile />} />
      </Routes>
    </Router>
  );
}

export default App;