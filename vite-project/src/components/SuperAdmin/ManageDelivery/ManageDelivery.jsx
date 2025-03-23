import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

const ManageDelivery = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      vehicalName: "Tata Ace",
      vehicalType: "Mini Truck",
      vehicalNumber: "PB10AB1234",
      vehicalLicense: "Tomato.jpeg", // Replace with actual URL
    },
    {
      id: 2,
      name: "Sita Devi",
      vehicalName: "Mahindra Bolero",
      vehicalType: "Pickup",
      vehicalNumber: "BR02XY5678",
      vehicalLicense: "Tomato.jpeg", // Replace with actual URL
    },    {
      id: 2,
      name: "Sita Devi",
      vehicalName: "Mahindra Bolero",
      vehicalType: "Pickup",
      vehicalNumber: "BR02XY5678",
      vehicalLicense: "Tomato.jpeg", // Replace with actual URL
    },    {
      id: 2,
      name: "Sita Devi",
      vehicalName: "Mahindra Bolero",
      vehicalType: "Pickup",
      vehicalNumber: "BR02XY5678",
      vehicalLicense: "Tomato.jpeg", // Replace with actual URL
    },    {
      id: 2,
      name: "Sita Devi",
      vehicalName: "Mahindra Bolero",
      vehicalType: "Pickup",
      vehicalNumber: "BR02XY5678",
      vehicalLicense: "Tomato.jpeg", // Replace with actual URL
    },    {
      id: 2,
      name: "Sita Devi",
      vehicalName: "Mahindra Bolero",
      vehicalType: "Pickup",
      vehicalNumber: "BR02XY5678",
      vehicalLicense: "Tomato.jpeg", // Replace with actual URL
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}> 
      <TableContainer 
        component={Paper} 
        sx={{ width: "100%", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",maxHeight: "495px"}}
      >
        <Sidebar/>
        <Table sx={{ width: "100%", tableLayout: "auto" }}>
          <TableHead sx={{ backgroundColor: "#316731",position: "sticky", top: 0, zIndex: 1 }}>
            <TableRow>
              {["ID", "Name", "Vehicle Name", "Vehicle Type", "Vehicle Number", "Vehicle License", "Action"].map(
                (header) => (
                  <TableCell key={header} sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id} hover>
                <TableCell>{delivery.id}</TableCell>
                <TableCell>{delivery.name}</TableCell>
                <TableCell>{delivery.vehicalName}</TableCell>
                <TableCell>{delivery.vehicalType}</TableCell>
                <TableCell>{delivery.vehicalNumber}</TableCell>
                <TableCell>
                  <img 
                    src={delivery.vehicalLicense} 
                    alt="Vehicle License" 
                    style={{ width: "100px", height: "60px", borderRadius: "5px", cursor: "pointer" }} 
                    onClick={() => handleImageClick(delivery.vehicalLicense)}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => setDeliveries(deliveries.filter(d => d.id !== delivery.id))} sx={{ fontSize: "12px" }}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Image Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <img src={selectedImage} alt="Vehicle License" style={{ width: "100%", height: "auto", maxWidth: "700px" }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageDelivery;
