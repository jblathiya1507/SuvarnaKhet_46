// // import { Routes, Route } from "react-router-dom";
// // import Signup from "./components/UserAuth/Signup";
// // import Login from "./components/UserAuth/Login";

// // import Sidebar from "./components/Farmer/Sidebar/Sidebar";

// import Product from "./components/Product/product";

// function App() {
//   return (
//     <>
//       {/* <Sidebar /> */}
//       <Product />
//       {/* <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes> */}
//     </>
//   );
// }

// export default App;

//Profile

import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Farmer/Sidebar/Sidebar";
 
import SellRequests from "./components/Farmer/SellRequests/SellRequests";
import ManageSelling from "./components/Farmer/ManageSelling/ManageSelling";
import Profile from "./components/Farmer/Profile/Profile"; // Import Profile Page
import FarmerDashboard from "./components/Farmer/Dashboard/FarmerDashboard";

const App = () => {
  return (
    <>
      <Sidebar />

      <div style={{ marginLeft: "250px", marginTop: "60px", padding: "20px" }}>
        <Routes>
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/sellrequests" element={<SellRequests />} />
          <Route path="/farmer/manageselling" element={<ManageSelling />} />
          <Route path="/farmer/profile" element={<Profile />} />{" "}
          {/* Add Profile Route */}
        </Routes>
      </div>
    </>
  );
};

export default App;

// import { Routes, Route } from "react-router-dom";

// // import Signup from "./components/Delivery/Auth/Signup";
// import Sidebar from "./components/Delivery/Sidebar/Sidebar";
// import ManagePickup from "./components/Delivery/ManagePickup/ManagePickup";
// import ManageDelivery from "./components/Delivery/ManageDelivery/ManageDelivery";
// import Profile from "./components/Delivery/Profile/Profile";
// // import Login from "./components/Delivery/Auth/Login";

// function App() {
//   return (
//     <>
//       <Sidebar />

//       <Routes>
//         {/* <Route path="/signup" element={<Signup />} /> */}
//         {/* <Route path="/login" element={<Login />} /> */}
//         <Route path="/managepickup" element={<ManagePickup />} />
//         <Route path="/managedelivery" element={<ManageDelivery />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
