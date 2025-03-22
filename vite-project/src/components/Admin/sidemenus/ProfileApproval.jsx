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

const ProfileApproval = () => {
  const [farmers, setFarmers] = useState([
    { id: 2, name: "Sita Devi", contact: "456789"},
    { id: 1, name: "Ramesh Kumar", contact: "456789"},
    { id: 3, name: "Rahul Sharma", contact: "456789"},
    { id: 4, name: "Amit Singh", contact: "456789" },
  ]);

  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [open, setOpen] = useState(false);

  // Open profile modal
  const handleOpenProfile = (farmer) => {
    setSelectedFarmer(farmer);
    setOpen(true);
  };

  // Close profile modal
  const handleClose = () => {
    setOpen(false);
    setSelectedFarmer(null);
  };

  // Approve or Reject Farmer (Profile modal will close immediately)
  const handleUpdateStatus = (id, newStatus) => {
    setOpen(false); // ✅ Close modal before showing Swal

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
        setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer.id !== id));

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
            Profile Approval
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
              {farmers.map((farmer) => (
                <TableRow key={farmer.id} hover>
                  <TableCell align="center">{farmer.id}</TableCell>
                  <TableCell align="center">{farmer.name}</TableCell>
                  <TableCell align="center">{farmer.contact}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="success" size="small" onClick={() => handleOpenProfile(farmer)} sx={{ marginRight: 1 }}>
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
          <DialogTitle>Farmer Profile</DialogTitle>
          <DialogContent>
            {selectedFarmer && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography><b>Name:</b> {selectedFarmer.name}</Typography>
                <Typography><b>Farm Address:</b> {selectedFarmer.farmAddress}</Typography>
                <Typography><b>City:</b> {selectedFarmer.city}</Typography>
                <Typography><b>State:</b> {selectedFarmer.state}</Typography>
                <Typography><b>Pincode:</b> {selectedFarmer.pincode}</Typography>
                <Typography><b>Farm Area:</b> {selectedFarmer.farmArea}</Typography>

                {/* Download Certificate Button with Icon */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2, width: "250px", alignSelf: "center" }}
                  onClick={() => window.open("/document.jpg", "_blank")}
                  startIcon={<DownloadIcon />} // ✅ Added Download Icon
                >
                  Download Certificate
                </Button>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}> {/* ✅ Centered Buttons */}
            <Button onClick={handleClose} variant="outlined" color="error">
              Close
            </Button>
            <Button onClick={() => handleUpdateStatus(selectedFarmer.id, "approved")} variant="contained" color="success">
              Approve
            </Button>
            <Button onClick={() => handleUpdateStatus(selectedFarmer.id, "rejected")} variant="contained" color="error">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ProfileApproval;
