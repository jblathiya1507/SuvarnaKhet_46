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
  Box,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

const ManageSelling = () => {
  const uf_id = localStorage.getItem("uf_id");

  const [sell_request, setSellRequest] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req_response = await axios.get(
        `http://127.0.0.1:8000/api/sell_request_get/`,
        { uf_id: uf_id }
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

  // Dummy Data
  const [sellRequests, setSellRequests] = useState([
    { id: 1, product: "Wheat", price: 200, quantity: 50, status: "approved" },
    { id: 2, product: "Rice", price: 150, quantity: 30, status: "pending" },
    { id: 3, product: "Corn", price: 180, quantity: 40, status: "rejected" },
    {
      id: 4,
      product: "Corn",
      price: 180,
      quantity: 40,
      status: "bid",
      bidPrice: 190,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);

  // Open dialog with bid details
  const handleViewBid = (bid) => {
    setSelectedBid(bid);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedBid(null);
  };

  // Approve or Reject Bid
  const handleUpdateStatus = async (id, state) => {
    console.log("A/R:", id);
    if (state == 1) {
      const f_approve_response = await axios.put(
        `http://127.0.0.1:8000/api/sell_request_update/?request_id=${id}`,
        { status: 4 }
      );
      console.log(f_approve_response.data);
    } else {
      const f_approve_response = await axios.put(
        `http://127.0.0.1:8000/api/sell_request_update/?request_id=${id}`,
        { status: 5 }
      );
      console.log(f_approve_response.data);
    }
    const req_response = await axios.get(
      `http://127.0.0.1:8000/api/sell_request_get/`,
      { uf_id: uf_id }
    );
    setSellRequest(req_response.data);

    handleClose();
  };

  // Render Status Column
  const getStatusComponent = (row) => {
    switch (row.status) {
      case 1:
        return (
          <TableCell sx={{textAlign:"center"}}>
            <Typography color="warning.main">⏳ Pending</Typography>
          </TableCell>
        );
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
            <Button
              variant="contained"
              color="success"
              onClick={() => handleViewBid(row)}
              size="small"
            >
              View Bid
            </Button>
          </TableCell>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px",
          height: "100vh",
        }}
      >
        <Sidebar />
        {/* Title with Image (Left-Aligned & Slightly Down) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            left: "5%", // Keeps it towards the left
            marginTop: "40px", // Moves title slightly downwards
            marginBottom: "40px", // Keeps space between title & table
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "left",
              color: "success.main",
              fontWeight: "bold",
            }}
          >
            Manage Selling
          </Typography>
        </Box>

        {/* Full-Width Table with Vertical Scrolling */}
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxHeight: "540px", // Set the maximum height to a specific value
            overflowY: "auto", // Vertical scrolling enabled
            overflowX: "hidden", // Prevent horizontal scrolling
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Table stickyHeader>
            <TableHead
              sx={{
                backgroundColor: "#316731",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow>
                {["Product Name", "Price (₹)", "Quantity", "Status"].map(
                  (header) => (
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
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sell_request.map((row) => (
                <TableRow key={row.request_id} hover>
                  <TableCell sx={{textAlign:"center"}}>
                    {products.find((product) => product.p_id === row.p_id)
                      ?.p_name || "N/A"}
                  </TableCell>
                  <TableCell sx={{textAlign:"center"}}>₹{row.p_price}</TableCell>
                  <TableCell sx={{textAlign:"center"}}>{row.p_qty}</TableCell>
                  {getStatusComponent(row)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for Viewing & Approving/Rejecting Bid */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Bid Details</DialogTitle>
          <DialogContent>
            {selectedBid && (
              <>
                <Typography>
                  Product:{" "}
                  <b>
                    {products.find(
                      (product) => product.p_id === selectedBid.p_id
                    )?.p_name || "N/A"}
                  </b>
                </Typography>
                <Typography>Original Price: ₹{selectedBid.p_price}</Typography>
                <Typography>
                  Bided Price: <b>₹{selectedBid.bid_price}</b>
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Close
            </Button>
            <Button
              onClick={() => handleUpdateStatus(selectedBid.request_id, 1)}
              variant="contained"
              color="success"
            >
              Approve
            </Button>
            <Button
              onClick={() => handleUpdateStatus(selectedBid.request_id, 0)}
              variant="contained"
              color="error"
            >
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ManageSelling;
