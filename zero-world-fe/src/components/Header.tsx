"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Search here...
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="primary">
            <NotificationsIcon />
          </IconButton>
          <Avatar src="/avatar.png" alt="Profile" />
          <Typography variant="body1">Mathew Wade</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
