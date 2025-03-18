import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useAuthStore } from "@/store/authStore";

const ProfileDropdown = () => {
  const { logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      {/* Profile Trigger */}
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleOpenMenu}
      >
        <Avatar
          src="/avatar.png"
          alt="Profile"
          sx={{ width: 40, height: 40, mr: 1 }}
        />
        <Typography variant="body1" fontWeight="bold">
          Mathew Wade
        </Typography>
        <ArrowDropDownIcon />
      </Box>

      {/* Profile Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              px: 1,
              // py: 1,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              minWidth: 250,
            },
          },
        }}
      >
        {/* Profile Header */}
        <Box sx={{ mb: 1 }}>
          <Box
            sx={{
              display: "Inline-flex",
              alignItems: "center",
              mb: 1,
              px: "3px",
              color: "success.main",
              border: "1px solid",
              borderRadius: 3,
            }}
          >
            <FiberManualRecordIcon fontSize="inherit" sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight="bold">
              Active
            </Typography>
          </Box>
          <Avatar
            src="/avatar.png"
            alt="Profile"
            sx={{ width: 56, height: 56, mr: 2, mx: "auto" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              Mathew Wade
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @wadelearn
            </Typography>
          </Box>
        </Box>

        {/* Active Status */}

        <Divider sx={{ mb: 1 }} />

        {/* Menu Items */}
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MenuBookIcon fontSize="small" />
          </ListItemIcon>
          Your Courses
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          Help Center
        </MenuItem>

        <Divider sx={{ mt: 1, mb: 1 }} />

        {/* Logout Button */}
        <MenuItem
          sx={{
            color: "#fff",
            bgcolor: "#1A3A40",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(255,0,0,0.5)",
            },
          }}
          onClick={logout}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileDropdown;
