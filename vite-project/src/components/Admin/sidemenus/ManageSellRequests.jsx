import React, { useState, useEffect } from "react";
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
import axios from "axios";

const ManageSellRequests = () => {
  const uf_id = localStorage.getItem("uf_id");
  // Dummy Data (More items for scrolling)
  // const [sellRequests, setSellRequests] = useState([
  //   { id: 1, product: "Wheat", price: 200, quantity: 50, status: "pending" },
  //   { id: 2, product: "Rice", price: 150, quantity: 30, status: "pending" },
  //   { id: 3, product: "Corn", price: 180, quantity: 40, status: "pending" },
  //   { id: 4, product: "Barley", price: 175, quantity: 25, status: "pending" },
  //   { id: 5, product: "Soybean", price: 300, quantity: 60, status: "pending" },
  //   { id: 6, product: "Peanuts", price: 250, quantity: 45, status: "pending" },
  //   { id: 7, product: "Millet", price: 160, quantity: 35, status: "pending" },
  //   { id: 8, product: "Lentils", price: 220, quantity: 50, status: "pending" },
  //   { id: 9, product: "Chickpeas", price: 280, quantity: 55, status: "pending" },
  //   { id: 10, product: "Sugarcane", price: 120, quantity: 70, status: "pending" },
  // ]);

  const [sellRequests, setSellRequest] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req_response = await axios.get(
        `http://127.0.0.1:8000/api/sell_request_get/`
      );
      console.log(req_response.data);
      setSellRequest(req_response.data);

      const product_response = await axios.get(
        `http://127.0.0.1:8000/api/products_get/`
      );
      console.log(product_response.data);
      setProducts(product_response.data);
    };
    fetchData();
  }, []);

  const getStatusComponent = (row) => {
    switch (row.status) {
      case 2:
        return (
          <TableCell sx={{textAlign:"center"}}>
            <Typography color="success.main">✅ Approved</Typography>
          </TableCell>
        );
      case 3:
        return (
          <TableCell sx={{textAlign:"center"}}>
            <Typography color="error.main">❌ Rejected</Typography>
          </TableCell>
        );
      case 4:
        return (
          <TableCell sx={{textAlign:"center"}}>
            <Typography color="success.main">✅ Approved</Typography>
          </TableCell>
        );
      case 5:
        return (
          <TableCell sx={{textAlign:"center"}}>
            <Typography color="error.main">❌ Rejected</Typography>
          </TableCell>
        );
      case 6:
        return (
          <TableCell sx={{textAlign:"center"}}>
            <Typography color="error.main">⏳ Bid Pending</Typography>
          </TableCell>
        );
      default:
        return null;
    }
  };

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
  const handleConfirmBid = async () => {
    if (bidPrice.trim() === "" || isNaN(bidPrice)) {
      handleClose();
      Swal.fire("Invalid Input", "Please enter a valid bid price", "error");
      return;
    }

    const f_approve_response = await axios.put(
      `http://127.0.0.1:8000/api/sell_request_update/?request_id=${selectedId}`,
      { status: 6, bid_price: bidPrice, mt_id: uf_id }
    );
    console.log(f_approve_response.data);
    const req_response = await axios.get(
      `http://127.0.0.1:8000/api/sell_request_get/`
    );
    setSellRequest(req_response.data);

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
    }).then(async(result) => {
      if (result.isConfirmed) {
        console.log(`${newStatus}`);
        if(newStatus === "approved"){
          const f_approve_response = await axios.put(
            `http://127.0.0.1:8000/api/sell_request_update/?request_id=${id}`,
            { status: 2 }
          );
          console.log(f_approve_response.data);
        }else{
          const f_approve_response = await axios.put(
            `http://127.0.0.1:8000/api/sell_request_update/?request_id=${id}`,
            { status: 3 }
          );
          console.log(f_approve_response.data);
        }
        const req_response = await axios.get(
          `http://127.0.0.1:8000/api/sell_request_get/`
        );
        setSellRequest(req_response.data);
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
              {["Product Name", "Price (₹)", "Quantity", "Actions"].map((header) => (
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
                <TableCell align="center">{products.find((product) => product.p_id === row.p_id)?.p_name || "N/A"}</TableCell>
                <TableCell align="center">₹{row.p_price}</TableCell>
                <TableCell align="center">{row.p_qty}</TableCell>
                {row.status !== 1 ?(
                  getStatusComponent(row)
                ):(
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleUpdateStatus(row.request_id, "approved")}
                    sx={{ marginRight: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleUpdateStatus(row.request_id, "rejected")}
                    sx={{ marginRight: 1 }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => handleOpenBidDialog(row.request_id)}
                  >
                    Bid
                  </Button>
                </TableCell>
                )}
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
