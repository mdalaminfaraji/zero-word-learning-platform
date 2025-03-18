"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Input,
} from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";

import NotificationDropdown from "../dashboard/Notifications";
import ProfileDropdown from "../dashboard/ProfileDropdwon";

export default function Header() {
  const [anchorElCalendar, setAnchorElCalendar] = useState<null | HTMLElement>(
    null
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
    // You can redirect or filter data based on the search query
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    setAnchor: React.Dispatch<React.SetStateAction<null | HTMLElement>>
  ) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = (
    setAnchor: React.Dispatch<React.SetStateAction<null | HTMLElement>>
  ) => {
    setAnchor(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          border: "2px solid #E7EAE9",
          m: 2,
          borderRadius: 3,
          zIndex: 0,
        }}
      >
        {/* Search Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            bgcolor: "#E7EAE9",
            width: "400px",
            borderRadius: 3,
          }}
        >
          <Input
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search here..."
            disableUnderline
            size="small"
            sx={{ pl: 2, flex: 1 }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon
              style={{
                backgroundColor: "#E4E4E4",
                padding: "2px",
                borderRadius: "4px",
              }}
            />
          </IconButton>
        </Box>

        {/* Icons Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="primary"
            onClick={(e) => handleOpenMenu(e, setAnchorElCalendar)}
          >
            <CalendarTodayIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElCalendar}
            open={Boolean(anchorElCalendar)}
            onClose={() => handleCloseMenu(setAnchorElCalendar)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem>Open Calendar</MenuItem>
          </Menu>

          <NotificationDropdown />

          <ProfileDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
