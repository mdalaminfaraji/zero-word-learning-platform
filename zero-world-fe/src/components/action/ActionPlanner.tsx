"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Add,
  CalendarToday,
  ExpandMore,
  Search,
  Close,
} from "@mui/icons-material";

// Demo data for the planner
const demoUsers = [
  { id: 1, name: "Ovi" },
  { id: 2, name: "Arif" },
];

export default function ActionPlanner() {
  const [expanded, setExpanded] = useState(true);
  const [planText, setPlanText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [assignedUsers, setAssignedUsers] = useState<
    { id: number; name: string }[]
  >([]);

  // Toggle accordion expansion
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  // Handle plan text change
  const handlePlanTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanText(e.target.value);
  };

  // Handle search text change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Assign user
  const handleAssignUser = (user: { id: number; name: string }) => {
    if (!assignedUsers.some((u) => u.id === user.id)) {
      setAssignedUsers([...assignedUsers, user]);
    }
    setSearchText("");
  };

  // Remove user
  const handleRemoveUser = (userId: number) => {
    setAssignedUsers(assignedUsers.filter((user) => user.id !== userId));
  };

  // Save plan
  const handleSavePlan = () => {
    // In a real app, this would save to a database
    alert("Plan saved!");
  };

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: 2,
        p: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        mt: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Action Planner
      </Typography>

      {/* Accordion */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E7EAE9",
          borderRadius: 2,
          mb: 3,
          overflow: "hidden",
        }}
      >
        <Box
          onClick={handleToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            cursor: "pointer",
          }}
        >
          <Typography fontWeight="500">
            Create supplier code of conduct for sustainability
          </Typography>
          <IconButton size="small">
            <ExpandMore
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </IconButton>
        </Box>

        {expanded && (
          <Box sx={{ p: 2, borderTop: "1px solid #E7EAE9" }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s,
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Input Area (separate from accordion) */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E7EAE9",
          borderRadius: 2,
          p: 1.5,
          mb: 2,
        }}
      >
        {/* Plan input field */}
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Create supplier code of conduct for sustainability"
          value={planText}
          onChange={handlePlanTextChange}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
            },
          }}
        />

        {/* User search & assignment area */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
          <Box sx={{ position: "relative", flex: 1 }}>
            <TextField
              fullWidth
              placeholder="Search User"
              size="small"
              value={searchText}
              onChange={handleSearchChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 50,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Search results dropdown - only show if search text exists */}
            {searchText.length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  position: "absolute",
                  width: "100%",
                  mt: 0.5,
                  zIndex: 10,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {demoUsers
                  .filter((user) =>
                    user.name.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((user) => (
                    <Box
                      key={user.id}
                      sx={{
                        p: 1.5,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }}
                      onClick={() => handleAssignUser(user)}
                    >
                      {user.name}
                    </Box>
                  ))}
              </Paper>
            )}
          </Box>

          {/* Assigned users */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, ml: 2 }}>
            {assignedUsers.map((user) => (
              <Chip
                key={user.id}
                label={user.name}
                onDelete={() => handleRemoveUser(user.id)}
                deleteIcon={<Close fontSize="small" />}
                sx={{
                  bgcolor: "#F0F0F0",
                  fontWeight: 500,
                  borderRadius: 4,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#203A43",
              color: "white",
              borderRadius: 50,
              textTransform: "none",
              px: { xs: 1.5, xl: 3 },
              py: 1,
              fontWeight: 500,
              "&:hover": {
                bgcolor: "#152a31",
              },
            }}
            onClick={handleSavePlan}
          >
            Save plan
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            sx={{
              bgcolor: "#E7F2F5",
              color: "#203A43",
              borderRadius: 50,
              textTransform: "none",
              px: { xs: 1.5, xl: 3 },
              py: 1,
              fontWeight: 500,
              "&:hover": {
                bgcolor: "#d0e6eb",
              },
            }}
          >
            Add More
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<CalendarToday />}
            sx={{
              borderColor: "#E0E0E0",
              color: "#555",
              borderRadius: 50,
              textTransform: "none",
              px: { xs: 1.5, xl: 3 },
              py: 1,
              fontWeight: 500,
              "&:hover": {
                borderColor: "#b0b0b0",
                bgcolor: "transparent",
              },
            }}
          >
            Due Date
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
