import React, { useState, useEffect } from "react";
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
import axios from "axios";

const ProfileApproval = () => {
  // const [farmers, setFarmers] = useState([
  //   { id: 2, name: "Sita Devi", contact: "456789"},
  //   { id: 1, name: "Ramesh Kumar", contact: "456789"},
  //   { id: 3, name: "Rahul Sharma", contact: "456789"},
  //   { id: 4, name: "Amit Singh", contact: "456789" },
  // ]);

  const[farmers, setFarmers] = useState([]);
  const[farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req_response = await axios.get(
        `http://127.0.0.1:8000/api/users_farmers_get/`,{params:{"uf_role_id":3,"status":2}}
      );
      console.log(req_response.data);
      setFarmers(req_response.data);
      const response = await axios.get(`http://127.0.0.1:8000/api/farm_get/`);
      console.log(response.data);
      setFarms(response.data[0]);
    };
    fetchData();
  }, []);

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
    setOpen(false);
    Swal.fire({
      title: `Are you sure you want to ${newStatus} this profile?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus}!`,
      cancelButtonText: "Cancel",
      confirmButtonColor: newStatus === "approved" ? "#28a745" : "#dc3545",
    }).then(async(result) => {
      if (result.isConfirmed) {
        if(newStatus === "approved"){
          const f_approve_response = await axios.put(
            `http://127.0.0.1:8000/api/users_farmers_update/?uf_id=${id}`,
            { status: 3 }
          );
          console.log(f_approve_response.data);
        }else{
          const f_approve_response = await axios.put(
            `http://127.0.0.1:8000/api/users_farmers_update/?uf_id=${id}`,
            { status: 4 }
          );
          console.log(f_approve_response.data);
        }
        const req_response = await axios.get(
          `http://127.0.0.1:8000/api/users_farmers_get/`,{params:{"uf_role_id":3,"status":2}}
        );
        console.log(req_response.data);
        setFarmers(req_response.data);
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
                  <TableCell align="center">{farmer.uf_id}</TableCell>
                  <TableCell align="center">{farmer.uf_name}</TableCell>
                  <TableCell align="center">{farmer.uf_mobile}</TableCell>
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
                <Typography><b>Name:</b> {selectedFarmer.uf_name}</Typography>
                <Typography><b>Farm Address:</b> {selectedFarmer.uf_address}</Typography>
                <Typography><b>City:</b> {selectedFarmer.uf_city}</Typography>
                <Typography><b>State:</b> {selectedFarmer.uf_state}</Typography>
                <Typography><b>Pincode:</b> {selectedFarmer.uf_pincode}</Typography>

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
            <Button onClick={() => handleUpdateStatus(selectedFarmer.uf_id, "approved")} variant="contained" color="success">
              Approve
            </Button>
            <Button onClick={() => handleUpdateStatus(selectedFarmer.uf_id, "rejected")} variant="contained" color="error">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ProfileApproval;
