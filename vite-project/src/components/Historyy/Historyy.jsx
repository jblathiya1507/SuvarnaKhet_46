import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, Button } from "@mui/material";

const userOrderHistory = [
  {
    id: 101,
    product: "Organic Wheat",
    quantity: 10,
    price: 5000,
    status: "Delivered",
    date: "2025-03-22",
  },
  {
    id: 102,
    product: "Fresh Apples",
    quantity: 5,
    price: 2500,
    status: "Pending",
    date: "2025-03-21",
  },
  {
    id: 103,
    product: "Rice Bags",
    quantity: 20,
    price: 10000,
    status: "Shipped",
    date: "2025-03-20",
  },
  {
    id: 104,
    product: "Milk Cans",
    quantity: 3,
    price: 1500,
    status: "Cancelled",
    date: "2025-03-19",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Shipped":
      return "primary";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const UserOrderHistory = () => {
  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
     <Typography 
  variant="h4" 
  sx={{ 
    marginBottom: "20px", 
    fontWeight: "bold", 
    fontSize: "28px", 
    color: "#316731", 
    textTransform: "uppercase", 
    letterSpacing: "1.5px", 
    borderBottom: "3px solid #4a8b4a", 
    display: "inline-block", 
    paddingBottom: "5px" 
  }}
>
  Order History
</Typography>

      <TableContainer component={Paper} sx={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", maxWidth: "90%" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#316731" }}>
            <TableRow>
              {["Order ID", "Product", "Quantity", "Price (₹)", "Status", "Date"].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrderHistory.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>₹{order.price}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={getStatusColor(order.status)} />
                </TableCell>
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserOrderHistory;
