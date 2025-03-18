import React from "react";
import { Box, Typography, LinearProgress, Chip, Stack } from "@mui/material";

const AssignmentCard: React.FC = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "white",
      }}
    >
      {/* Title */}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ mb: 1, borderBottom: "1px solid #e0e0e0", pl: 2, py: 1 }}
      >
        Assignment
      </Typography>

      <Box sx={{ px: 2, py: 1 }}>
        {/* Progress */}
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="caption" fontWeight="bold">
            80% Submitted
          </Typography>
          <Typography variant="caption" color="text.secondary">
            20% Remaining
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={80}
          sx={{
            height: 4,
            borderRadius: 4,
            mb: 1,
            backgroundColor: "#f0f0f0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#f57c00",
            },
          }}
        />
        <Typography variant="caption" color="text.secondary">
          40 Assignment
        </Typography>

        {/* Passed and Failed Chips */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}
        >
          <Chip
            label="Passed: 50"
            size="small"
            sx={{
              backgroundColor: "#e8f5e9",
              color: "#4caf50",
              fontWeight: "bold",
            }}
          />
          <Chip
            label="Failed: 30"
            size="small"
            sx={{
              backgroundColor: "#ffebee",
              color: "#f44336",
              fontWeight: "bold",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default AssignmentCard;
