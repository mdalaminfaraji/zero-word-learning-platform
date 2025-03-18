import React from "react";
import { Box, Typography } from "@mui/material";

const AssessmentStepper = () => {
  const totalSteps = 30; // Total number of steps
  const currentStep = 2; // Current active step (can be dynamic)

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Your Assessment
      </Typography>

      {/* Stepper Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px", // Space between step segments
        }}
      >
        {/* Steps */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Box
            key={index}
            sx={{
              flex: 1, // Each step takes equal space
              height: "8px",
              borderRadius: "4px",
              backgroundColor:
                index < currentStep
                  ? "#f4a261" // Orange for completed steps
                  : "#e0e0e0", // Light gray for unfinished steps
            }}
          />
        ))}
      </Box>

      {/* Steps Indicator */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          marginTop: "8px",
          textAlign: "right",
          color: "#888888",
          fontWeight: "bold",
        }}
      >
        Step {String(currentStep).padStart(2, "0")}/
        {String(totalSteps).padStart(2, "0")}
      </Typography>
    </Box>
  );
};

export default AssessmentStepper;
