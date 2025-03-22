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
// import ContactPage from "./components/ContactPage/ContactPage"; // Ensure this file exists

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
          {/* <Route path="contact" element={<ContactPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;