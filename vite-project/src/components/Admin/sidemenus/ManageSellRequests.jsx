import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import Swal from "sweetalert2"; // Import SweetAlert
import Sidebar from "../sidebar/Sidebar";

const ManageSellRequests = () => {
  // Dummy Data (More items for scrolling)
  const [sellRequests, setSellRequests] = useState([
    { id: 1, product: "Wheat", price: 200, quantity: 50, status: "pending" },
    { id: 2, product: "Rice", price: 150, quantity: 30, status: "pending" },
    { id: 3, product: "Corn", price: 180, quantity: 40, status: "pending" },
    { id: 4, product: "Barley", price: 175, quantity: 25, status: "pending" },
    { id: 5, product: "Soybean", price: 300, quantity: 60, status: "pending" },
    { id: 6, product: "Peanuts", price: 250, quantity: 45, status: "pending" },
    { id: 7, product: "Millet", price: 160, quantity: 35, status: "pending" },
    { id: 8, product: "Lentils", price: 220, quantity: 50, status: "pending" },
    { id: 9, product: "Chickpeas", price: 280, quantity: 55, status: "pending" },
    { id: 10, product: "Sugarcane", price: 120, quantity: 70, status: "pending" },
  ]);

  const [open, setOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Open popup for bidding
  const handleOpenBidDialog = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  // Close popup
  const handleClose = () => {
    setOpen(false);
    setBidPrice("");
    setSelectedId(null);
  };

  // Submit Bid and Update Price (Keeps request in table)
  const handleConfirmBid = () => {
    if (bidPrice.trim() === "" || isNaN(bidPrice)) {
      Swal.fire("Invalid Input", "Please enter a valid bid price", "error");
      return;
    }

    setSellRequests((prev) =>
      prev.map((req) =>
        req.id === selectedId ? { ...req, price: Number(bidPrice), status: "bid" } : req
      )
    );

    handleClose();
    Swal.fire("Bid Placed!", `Your bid of ₹${bidPrice} has been submitted.`, "success");
  };

  // Approve or Reject Request with SweetAlert Confirmation
  const handleUpdateStatus = (id, newStatus) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${newStatus} this request.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}!`,
      cancelButtonText: "Cancel",
      confirmButtonColor: newStatus === "approved" ? "#28a745" : "#dc3545",
    }).then((result) => {
      if (result.isConfirmed) {
        setSellRequests((prev) =>
          prev.filter((req) => req.id !== id || req.status === "bid") // ✅ Keeps only "bid" status
        );
        Swal.fire("Updated!", `Request has been ${newStatus}.`, "success");
      }
    });
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // ✅ Keeps title left-aligned
        padding: "20px",
        height: "100vh",
      }}
    >
      <Sidebar/>
      {/* Title with Icon (Left-Aligned & Bigger) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: "5%", // ✅ Keeps it towards the left
          marginTop: "40px", // ✅ Moves title slightly downwards
          marginBottom: "40px", // ✅ Keeps space between title & table
        }}
      >
        {/* Request Icon (Before Title) */}
        <img
          src="/request.png" // ✅ Ensure the image is inside `/public/`
          alt="Manage Requests"
          style={{
            width: "50px", // ✅ Increased icon size slightly
            height: "50px",
            marginRight: "15px", // ✅ Adds spacing between icon & title
          }}
        />

        <Typography
          variant="h4" // ✅ Bigger title
          sx={{
            textAlign: "left",
            color: "success.main",
            fontWeight: "bold",
            fontSize: "28px", // ✅ Increased font size
          }}
        >
          Manage Sell Requests
        </Typography>
      </Box>

      {/* Full-Width Table with Vertical Scrolling */}
      <TableContainer
        component={Paper}
        sx={{
          width: "1400px", // ✅ Keeps width as requested
          maxWidth: "1400px",
          maxHeight: "75vh", // ✅ Enables vertical scrolling
          overflowY: "auto",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Table stickyHeader> {/* ✅ Keeps header fixed while scrolling */}
          <TableHead sx={{ backgroundColor: "#316731" }}>
            <TableRow>
              {["Product Name", "Price (₹)", "Quantity", "Status", "Actions"].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    backgroundColor: "#316731",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sellRequests.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.product}</TableCell>
                <TableCell align="center">₹{row.price}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      color:
                        row.status === "approved"
                          ? "success.main"
                          : row.status === "rejected"
                          ? "error.main"
                          : row.status === "bid"
                          ? "warning.main"
                          : "text.primary",
                      fontWeight: "bold",
                    }}
                  >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleUpdateStatus(row.id, "approved")}
                    sx={{ marginRight: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleUpdateStatus(row.id, "rejected")}
                    sx={{ marginRight: 1 }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => handleOpenBidDialog(row.id)}
                  >
                    Bid
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bid Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Bid Price</DialogTitle>
        <DialogContent>
          <TextField
            label="Bid Price (₹)"
            fullWidth
            variant="outlined"
            value={bidPrice}
            onChange={(e) => setBidPrice(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirmBid} variant="contained" color="success">
            Confirm Bid
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
};

export default ManageSellRequests;
