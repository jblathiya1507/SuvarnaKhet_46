import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const ManageWarehouses = () => {
  const [farmers, setFarmers] = useState([
    {
      id: 1,
      name: "WareHouse",
      mobile: "9876543210",
      email: "ramesh@example.com",
      address: "Village No. 5, Punjab",
      gender: "Male",
      city: "Amritsar",
      state: "Punjab",
      pincode: "143001",
      dob: "1985-06-15",
    },
    {
      id: 2,
      name: "Sita Devi",
      mobile: "9823456789",
      email: "sita@example.com",
      address: "House No. 42, Bihar",
      gender: "Female",
      city: "Patna",
      state: "Bihar",
      pincode: "800001",
      dob: "1990-08-22",
    },
    // Add more farmers if needed
  ]);

  const handleRemove = (id) => {
    const updatedFarmers = farmers.filter((farmer) => farmer.id !== id);
    setFarmers(updatedFarmers);
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto", // Remove horizontal scrollbar
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          maxHeight: "495px", // Only vertical scroll will appear
          overflowY: "auto", // Enable vertical scroll
        }}
      >
        <Sidebar/>
        <Table sx={{ width: "100%", tableLayout: "auto" }}>
          <TableHead
            sx={{
              backgroundColor: "#316731",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TableRow>
              {[
                "ID",
                "Name",
                "Mobile",
                "Email",
                "Address",
                "Gender",
                "City",
                "State",
                "Pincode",
                "DOB",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {farmers.map((farmer) => (
              <TableRow key={farmer.id} hover>
                <TableCell>{farmer.id}</TableCell>
                <TableCell>{farmer.name}</TableCell>
                <TableCell>{farmer.mobile}</TableCell>
                {/* Apply whiteSpace: "nowrap" to email */}
                <TableCell sx={{ wordBreak: "break-word", whiteSpace: "nowrap" }}>
                  {farmer.email}
                </TableCell>
                <TableCell sx={{ wordBreak: "break-word" }}>{farmer.address}</TableCell>
                <TableCell>{farmer.gender}</TableCell>
                <TableCell>{farmer.city}</TableCell>
                <TableCell>{farmer.state}</TableCell>
                <TableCell>{farmer.pincode}</TableCell>
                <TableCell>{farmer.dob}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemove(farmer.id)}
                    sx={{ fontSize: "12px" }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageWarehouses;
