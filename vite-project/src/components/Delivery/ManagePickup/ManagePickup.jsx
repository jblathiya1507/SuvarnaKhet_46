import React, { useState } from "react";
import Swal from "sweetalert2";
import QRCode from "qrcode"; // Import qrcode library

import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const ManagePickup = () => {
  // Dummy data for pickup details
  const pickupDetails = [
    {
      id: 1,
      farmer: "John Doe",
      product: "Tomatoes",
      quantity: "50kg",
      date: "2025-03-22",
    },
    {
      id: 2,
      farmer: "Jane Smith",
      product: "Wheat",
      quantity: "100kg",
      date: "2025-03-21",
    },
    {
      id: 3,
      farmer: "Michael Lee",
      product: "Potatoes",
      quantity: "75kg",
      date: "2025-03-20",
    },
    {
      id: 4,
      farmer: "Emily Clark",
      product: "Carrots",
      quantity: "60kg",
      date: "2025-03-19",
    },
    // Add more rows as needed
  ];

  // State to track which pickup has a QR generated
  const [qrGenerated, setQrGenerated] = useState(null);
  const [qrContent, setQrContent] = useState(""); // Store QR content

  // Handle QR Generation and show "View QR" button
  const handleGenerateQR = (id) => {
    const qrData = `Pickup ID: ${id}`;
    setQrContent(qrData); // Set the QR content

    // Show SweetAlert with OK button
    Swal.fire({
      title: "QR Code Generated ✅",
      html: `QR code is generated for Pickup ID: ${id}`,
      icon: "success",
      confirmButtonColor: "#316731",
      confirmButtonText: "OK",
      showConfirmButton: true,
      didClose: () => {
        // After the modal is closed, update state to show "View QR" button
        setQrGenerated(id);
      },
    });
  };

  // Function to view the QR code from the content and display it
  const viewQR = async (id) => {
    // Generate QR code as a Data URL (base64 image)
    const qrImageUrl = await QRCode.toDataURL(qrContent);

    Swal.fire({
      title: `QR for Pickup ID: ${id}`,
      html: `
        <div>
          <img src="${qrImageUrl}" alt="QR Code" style="width: 200px; height: 200px; margin-top: 20px;" />
        </div>
        <div style="margin-top: 10px;">
          <a href="${qrImageUrl}" download="pickup-qr-code.png">
            <Button variant="contained" color="secondary" sx={{ borderRadius: "20px" }}>
              Download QR
            </Button>
          </a>
        </div>
      `,
      confirmButtonColor: "#316731",
      confirmButtonText: "Close",
      showConfirmButton: true,
    });
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
            src="/pickup.png"
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
            Manage Pickup
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
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableRow>
                {[
                  "ID",
                  "Farmer Name",
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
              {pickupDetails.map((pickup) => (
                <TableRow
                  key={pickup.id}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell align="center">{pickup.id}</TableCell>
                  <TableCell align="center">{pickup.farmer}</TableCell>
                  <TableCell align="center">{pickup.product}</TableCell>
                  <TableCell align="center">{pickup.quantity}</TableCell>
                  <TableCell align="center">{pickup.date}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleGenerateQR(pickup.id)} // Trigger the QR generation
                      sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        backgroundColor: "#2E7D32",
                        "&:hover": { backgroundColor: "#1B5E20" },
                      }}
                    >
                      Generate QR
                    </Button>
                    {qrGenerated === pickup.id && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => viewQR(pickup.id)} // Trigger the View QR functionality
                        sx={{
                          borderRadius: "20px",
                          textTransform: "none",
                          backgroundColor: "#FF5722",
                          "&:hover": { backgroundColor: "#D84315" },
                          marginTop: "10px",
                        }}
                      >
                        View QR
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

export default ManagePickup;
