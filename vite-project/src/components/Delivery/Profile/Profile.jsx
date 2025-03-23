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

  const [vehicleInfo, setVehicleInfo] = useState({
    Name: "Honda",
    Type: "Bike",
    Number: "GJ101",
    License: "",
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
    setVehicleInfo((prev) => ({
      ...prev,
      License: e.target.files[0] ? e.target.files[0].name : "",
    }));
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
      
      <Box
        sx={{
          transition: "all 0.3s ease-in-out",
          marginLeft: sidebarOpen ? "250px" : "0px",
          width: sidebarOpen ? "calc(100% - 250px)" : "100%",
          padding: 3,
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Sidebar/>
         <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // position: "relative",
                    // left: "5%",
                    marginTop: "40px",
                    marginBottom: "40px",
                  }}
                >
                  <img
                    src="/approve.png"
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
                    Profile Details
                  </Typography>
                </Box>
        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                textAlign: "center",
                padding: 3,
                boxShadow: 3,
                borderRadius: 3,
                backgroundColor: grey[100],
              }}
            >
              <CardContent>
                <Avatar
                  src={profile.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: "0 auto",
                    boxShadow: 2,
                  }}
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
                sx={{
                  mt: 3,
                  backgroundColor: "#2E7D32",
                  "&:hover": { backgroundColor: "#1B5E20" },
                }}
                onClick={() => handleToggleDialog("profile", true)}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>

          {/* Vehicle Info */}
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
                Vehicle Information
              </Typography>
              {Object.entries(vehicleInfo).map(([key, value]) => (
                <Typography key={key} variant="body2" sx={{ mb: 1 }}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                </Typography>
              ))}
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#2E7D32",
                  "&:hover": { backgroundColor: "#1B5E20" },
                }}
                onClick={() => handleToggleDialog("farm", true)}
              >
                Edit Vehicle Details
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
              sx={{ color: "#2E7D32", "&:hover": { color: "#1B5E20" } }}
              onClick={() => handleToggleDialog("profile", false)}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "#2E7D32",
                "&:hover": { backgroundColor: "#1B5E20" },
              }}
              onClick={() => handleToggleDialog("profile", false)}
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Vehicle Dialog */}
        <Dialog
          open={openEditFarm}
          onClose={() => handleToggleDialog("farm", false)}
          fullWidth
        >
          <DialogTitle>Edit Vehicle Details</DialogTitle>
          <DialogContent>
            {Object.keys(vehicleInfo)
              .slice(0, 3)
              .map((field) => (
                <TextField
                  key={field}
                  fullWidth
                  margin="dense"
                  label={field}
                  name={field}
                  value={vehicleInfo[field]}
                  onChange={(e) => handleChange(e, setVehicleInfo)}
                />
              ))}
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Current License:</strong>{" "}
              {vehicleInfo.License || "No file uploaded"}
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                mt: 2,
                backgroundColor: "#2E7D32",
                "&:hover": { backgroundColor: "#1B5E20" },
              }}
            >
              Upload Driving License
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ color: "#2E7D32", "&:hover": { color: "#1B5E20" } }}
              onClick={() => handleToggleDialog("farm", false)}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "#2E7D32",
                "&:hover": { backgroundColor: "#1B5E20" },
              }}
              onClick={() => handleToggleDialog("farm", false)}
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Profile;
