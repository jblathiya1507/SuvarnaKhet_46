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

const ManageFarmers = () => {
  const [farmers, setFarmers] = useState([
    {
      id: 1,
      name: "Farmer",
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
    {
      id: 3,
      name: "John Doe",
      mobile: "9123456789",
      email: "john.doe@example.com",
      address: "Street No. 12, Delhi",
      gender: "Male",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      dob: "1988-07-10",
    },
    {
      id: 3,
      name: "John Doe",
      mobile: "9123456789",
      email: "john.doe@example.com",
      address: "Street No. 12, Delhi",
      gender: "Male",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      dob: "1988-07-10",
    },
    {
      id: 3,
      name: "John Doe",
      mobile: "9123456789",
      email: "john.doe@example.com",
      address: "Street No. 12, Delhi",
      gender: "Male",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      dob: "1988-07-10",
    },
    // Add more farmers here...
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
          overflowX: "auto", // Enable horizontal scroll
          overflowY: "auto", // Enable vertical scroll
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          maxHeight: "495px", // Fixed height for the scrollable container
        }}
      >
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
                    minWidth: "120px", // Set min width for each cell
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
                <TableCell sx={{ wordBreak: "break-word", whiteSpace: "nowrap" }}>
                  {farmer.email}
                </TableCell>
                <TableCell sx={{ wordBreak: "break-word" }}>
                  {farmer.address}
                </TableCell>
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

export default ManageFarmers;
