import React from "react";
import { Box } from "@mui/material";

interface StepProps {
  number: string;
  active: boolean;
  completed: boolean;
}

const PathwayStep: React.FC<StepProps> = ({ number, active, completed }) => {
  const getColor = () => {
    if (completed) return "#0ECB81";
    if (active) return "#F8B75D";
    return "#E7EAE9";
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: getColor(),
          color: completed || active ? "white" : "#666",
          fontWeight: "bold",
          fontSize: "0.75rem",
        }}
      >
        {number}
      </Box>
    </Box>
  );
};

export default PathwayStep;
