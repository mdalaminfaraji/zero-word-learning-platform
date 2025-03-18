import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

interface PathwayProgressProps {
  progress: number;
}

const PathwayProgressCard: React.FC<PathwayProgressProps> = ({ progress }) => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 3,
        mt: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Your Learning Pathway Progress
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 1 }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#E7EAE9",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: "#1E383C",
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          0%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
};

export default PathwayProgressCard;
