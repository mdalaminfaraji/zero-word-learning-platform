// components/ProgressCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SettingsIcon from "@mui/icons-material/Settings";

const ProgressCard: React.FC = () => {
  const score = 8.966;
  const percentage = (score / 10) * 100;

  return (
    <Card sx={{ maxWidth: 300, margin: "auto" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Point Progress</Typography>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Select defaultValue="Understanding">
            <MenuItem value="Understanding">Understanding</MenuItem>
            {/* Add more menu items as needed */}
          </Select>
        </Box>
        <Box
          sx={{ position: "relative", width: 150, height: 150, margin: "auto" }}
        >
          <CircularProgressbar
            value={percentage}
            text={`${score}`}
            styles={buildStyles({
              pathColor: "#3b82f6",
              textColor: "#000",
              trailColor: "#e5e7eb",
              backgroundColor: "#f9fafb",
              textSize: "24px",
            })}
          />
        </Box>
        <Typography variant="h6" textAlign="center" marginTop={2}>
          Total Score
        </Typography>
        <Typography variant="h4" textAlign="center">
          {score.toFixed(3)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
