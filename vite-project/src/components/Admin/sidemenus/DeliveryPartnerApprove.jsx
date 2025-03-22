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
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import DownloadIcon from "@mui/icons-material/Download"; // ✅ Import Download Icon
import Sidebar from "../sidebar/Sidebar";

const DeliveryPartnerApprove = () => {
  const [partners, setPartners] = useState([
    { id: 1, name: "Ramesh Kumar", email: "ramesh@email.com", contact: "7894567894", city: "Mumbai", state: "Maharashtra", pincode: "400001", vehicleName: "Honda Activa", vehicleType: "Scooter", vehicleNumber: "MH-12-AB-1234" },
    { id: 2, name: "Sita Devi", email: "sita@email.com", contact: "7894567894", city: "Delhi", state: "Delhi", pincode: "110001", vehicleName: "Bajaj Pulsar", vehicleType: "Bike", vehicleNumber: "DL-05-XY-5678" },
    { id: 3, name: "Rahul Sharma", email: "rahul@email.com", contact: "7894567894", city: "Bangalore", state: "Karnataka", pincode: "560001", vehicleName: "Suzuki Access", vehicleType: "Scooter", vehicleNumber: "KA-03-ZB-8901" },
    { id: 4, name: "Amit Singh", email: "amit@email.com", contact: "7894567894", city: "Pune", state: "Maharashtra", pincode: "411001", vehicleName: "Royal Enfield", vehicleType: "Bike", vehicleNumber: "MH-14-RT-4321" },
  ]);

  const [selectedPartner, setSelectedPartner] = useState(null);
  const [open, setOpen] = useState(false);

  // ✅ Open profile modal with selected partner details
  const handleOpenProfile = (partner) => {
    setSelectedPartner(partner);
    setOpen(true);
  };

  // ✅ Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedPartner(null);
  };

  // ✅ Approve or Reject Partner (Closes modal immediately)
  const handleUpdateStatus = (id, newStatus) => {
    setOpen(false); // Close modal before showing Swal

    Swal.fire({
      title: `Are you sure you want to ${newStatus} this profile?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}!`,
      cancelButtonText: "Cancel",
      confirmButtonColor: newStatus === "approved" ? "#28a745" : "#dc3545",
    }).then((result) => {
      if (result.isConfirmed) {
        setPartners((prevPartners) => prevPartners.filter((partner) => partner.id !== id));

        Swal.fire({
          title: `Profile ${newStatus}!`,
          text: `The profile has been successfully ${newStatus}.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px", height: "100vh" }}>
        <Sidebar/>
        {/* Title with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", position: "relative", left: "5%", marginTop: "40px", marginBottom: "40px" }}>
          <img src="/approve.png" alt="Approve" style={{ width: "50px", height: "50px", marginRight: "15px" }} />
          <Typography variant="h4" sx={{ textAlign: "left", color: "success.main", fontWeight: "bold" }}>
            Delivery Partner Profile Approval
          </Typography>
        </Box>

        {/* Full-Width Table */}
        <TableContainer component={Paper} sx={{ width: "1400px", maxWidth: "1400px", maxHeight: "75vh", overflowY: "auto", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: "#316731" }}>
              <TableRow>
                {["ID", "Name", "Contact Number", "Action"].map((header) => (
                  <TableCell key={header} sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center", backgroundColor: "#316731" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id} hover>
                  <TableCell align="center">{partner.id}</TableCell>
                  <TableCell align="center">{partner.name}</TableCell>
                  <TableCell align="center">{partner.contact}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="success" size="small" onClick={() => handleOpenProfile(partner)} sx={{ marginRight: 1 }}>
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Profile Modal (Wider) */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Delivery Partner Profile</DialogTitle>
          <DialogContent>
            {selectedPartner && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography><b>Name:</b> {selectedPartner.name}</Typography>
                <Typography><b>Email:</b> {selectedPartner.email}</Typography>
                <Typography><b>Contact Number:</b> {selectedPartner.contact}</Typography>
                <Typography><b>City:</b> {selectedPartner.city}</Typography>
                <Typography><b>State:</b> {selectedPartner.state}</Typography>
                <Typography><b>Pincode:</b> {selectedPartner.pincode}</Typography>
                <Typography><b>Vehicle Name:</b> {selectedPartner.vehicleName}</Typography>
                <Typography><b>Vehicle Type:</b> {selectedPartner.vehicleType}</Typography>
                <Typography><b>Vehicle Number:</b> {selectedPartner.vehicleNumber}</Typography>

                {/* Download Certificate Button */}
                <Button variant="contained" color="primary" sx={{ marginTop: 2, width: "250px", alignSelf: "center" }} onClick={() => window.open("/document.jpg", "_blank")} startIcon={<DownloadIcon />}>
                  Download Driving License
                </Button>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
            <Button onClick={handleClose} variant="outlined" color="error">
              Close
            </Button>
            <Button onClick={() => handleUpdateStatus(selectedPartner.id, "approved")} variant="contained" color="success">
              Approve
            </Button>
            <Button onClick={() => handleUpdateStatus(selectedPartner.id, "rejected")} variant="contained" color="error">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default DeliveryPartnerApprove;