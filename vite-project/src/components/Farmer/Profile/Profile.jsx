import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Sidebar from "../Sidebar/Sidebar";

const Profile = ({ sidebarOpen }) => {
  const [profile, setProfile] = useState({
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
    name: "John Doe",
    role: "Full Stack Developer",
    location: "Bay Area, San Francisco, CA",
    fullName: "Kenneth Valdez",
    email: "fip@jukmuh.al",
    phone: "(239) 816-9029",
    mobile: "(320) 380-4539",
    address: "Bay Area, San Francisco, CA",
  });

  const [farmInfo, setFarmInfo] = useState({
    Name: "Organic Farm",
    Type: "Vegetable",
    Size: "50 acres",
    Address: "123 Farm Lane",
    City: "Farmville",
    State: "California",
    Pincode: "12345",
    Area: "50 acres",
    Certificate: "", // Add file upload for certificate
  });

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditFarm, setOpenEditFarm] = useState(false);

  const handleToggleDialog = (type, state) => {
    if (type === "profile") setOpenEditProfile(state);
    else if (type === "farm") setOpenEditFarm(state);
  };

  const handleChange = (e, setState) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFarmInfo((prev) => ({
      ...prev,
      Certificate: e.target.files[0] ? e.target.files[0].name : "",
    }));
  };

  return (
   
   <>
   <div style={{ marginLeft: "250px", padding: "20px" }}>
      <Grid container spacing={3}>
        <Sidebar/>
        {/* Profile Card */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              textAlign: "center",
              padding: 4,
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: grey[50],
            }}
          >
            <CardContent > 
              <Avatar
                src={profile.avatar}
                sx={{ width: 120, height: 120, margin: "0 auto", boxShadow: 2 }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.location}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Info */}
        <Grid item xs={12} sm={8}>
          <Paper
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: grey[50],
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Profile Information
            </Typography>
            {Object.entries(profile)
              .slice(3)
              .map(([key, value]) => (
                <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                </Typography>
              ))}
            <Button
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#1B5E20" }}}
              onClick={() => handleToggleDialog("profile", true)}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Farm Info */}
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: 3,
              backgroundColor: grey[50],
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Farm Information
            </Typography>
            {Object.entries(farmInfo).map(([key, value]) => (
              <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
              </Typography>
            ))}
            <Button
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#1B5E20" } }}
              onClick={() => handleToggleDialog("farm", true)}
            >
              Edit Farm Details
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditProfile}
        onClose={() => handleToggleDialog("profile", false)}
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {Object.keys(profile)
            .slice(3)
            .map((field) => (
              <TextField
                key={field}
                fullWidth
                margin="dense"
                label={field}
                name={field}
                value={profile[field]}
                onChange={(e) => handleChange(e, setProfile)}
              />
            ))}
        </DialogContent>
        <DialogActions>
        
          <Button
           sx={{ color: "#2E7D32", "&:hover": { color: "#1B5E20" }}}
          onClick={() => handleToggleDialog("profile", false)}>
            Cancel
          </Button>
          <Button
             sx={{backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#1B5E20" }}}
            onClick={() => handleToggleDialog("profile", false)}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Farm Dialog */}
      <Dialog
        open={openEditFarm}
        onClose={() => handleToggleDialog("farm", false)}
        fullWidth
      >
        <DialogTitle>Edit Farm Details</DialogTitle>
        <DialogContent>
          {Object.keys(farmInfo)
            .slice(0, 5)
            .map((field) => (
              <TextField
                key={field}
                fullWidth
                margin="dense"
                label={field}
                name={field}
                value={farmInfo[field]}
                onChange={(e) => handleChange(e, setFarmInfo)}
              />
            ))}
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Current Certificate:</strong>{" "}
            {farmInfo.Certificate || "No file uploaded"}
          </Typography>
          <Button variant="contained" component="label" sx={{ mt: 2,backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#1B5E20" } }}>
            Upload Farm Certificate
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button 
          sx={{ color: "#2E7D32", "&:hover": { color: "#1B5E20" }}}
          onClick={() => handleToggleDialog("farm", false)}>
            Cancel
          </Button>
          <Button
          sx={{backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#1B5E20" }}}
            onClick={() => handleToggleDialog("farm", false)}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
};

export default Profile;
