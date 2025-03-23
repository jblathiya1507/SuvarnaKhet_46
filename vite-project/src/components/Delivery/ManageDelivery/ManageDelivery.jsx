import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const ManageDelivery = () => {
  const [deliveredOrders, setDeliveredOrders] = useState({}); // Track delivered orders

  const deliveryDetails = [
    {
      id: 1,
      name: "Alice Johnson",
      address: "123 Green St, NY",
      product: "Tomatoes",
      quantity: "50kg",
      date: "2025-03-25",
    },
    {
      id: 2,
      name: "Bob Williams",
      address: "45 Lakeview Ave, CA",
      product: "Wheat",
      quantity: "100kg",
      date: "2025-03-26",
    },
    {
      id: 3,
      name: "Charlie Brown",
      address: "78 Maple St, TX",
      product: "Potatoes",
      quantity: "75kg",
      date: "2025-03-27",
    },
  ];

  const correctOTP = "418910"; // Dummy OTP

  const askForOTP = (id) => {
    Swal.fire({
      title: "Enter OTP",
      input: "text",
      inputPlaceholder: "Enter OTP received",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value === correctOTP) {
          setDeliveredOrders((prev) => ({ ...prev, [id]: true })); // Mark as delivered
          Swal.fire({
            icon: "success",
            title: "Delivery Successful",
            text: "The order has been delivered successfully!",
            confirmButtonColor: "#316731",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid OTP!",
            text: "Please try again.",
            confirmButtonText: "Retry",
          }).then(() => {
            askForOTP(id);
          });
        }
      }
    });
  };

  const handleDeliverOrder = (id) => {
    if (deliveredOrders[id]) {
      Swal.fire("Already Delivered", "This order has been delivered!", "info");
      return;
    }
    askForOTP(id);
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px",
          height: "700px",
        }}
      >
        <Sidebar/>
        {/* Title with Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            left: "5%",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <img
            src="/managedelivery.png"
            alt="pickup"
            style={{ width: "50px", height: "50px", marginRight: "15px" }}
          />
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              color: "success.main",
              fontWeight: "bold",
            }}
          >
            Manage Delivery
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            maxHeight: "800px",  
            overflowY: "auto",  
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#316731",
                position: "sticky", // Make the header sticky
                top: 0, // Stick it to the top
                zIndex: 1, // Ensure the header stays on top of the body
              }}
            >
              <TableRow>
                {[
                  "ID",
                  "Customer Name",
                  "Address",
                  "Product",
                  "Quantity",
                  "Date",
                  "Action",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryDetails.map((delivery) => (
                <TableRow
                  key={delivery.id}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell align="center">{delivery.id}</TableCell>
                  <TableCell align="center">{delivery.name}</TableCell>
                  <TableCell align="center">{delivery.address}</TableCell>
                  <TableCell align="center">{delivery.product}</TableCell>
                  <TableCell align="center">{delivery.quantity}</TableCell>
                  <TableCell align="center">{delivery.date}</TableCell>
                  <TableCell align="center">
                    {deliveredOrders[delivery.id] ? (
                      <Typography color="green" fontWeight="bold">
                        Delivery Successful ✅
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDeliverOrder(delivery.id)}
                        sx={{
                          borderRadius: "20px",
                          textTransform: "none",
                          backgroundColor: "#2E7D32",
                          "&:hover": { backgroundColor: "#1B5E20" },
                        }}
                      >
                        Deliver Order
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ManageDelivery;
