"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  MenuItem,
  Select,
  Grid,
  Chip,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
const data = [
  { day: "Sat", active: 6, idle: 6 },
  { day: "Sun", active: 8, idle: 4 },
  { day: "Mon", active: 10, idle: 2 },
  { day: "Tue", active: 7, idle: 5 },
  { day: "Wed", active: 9, idle: 3 },
  { day: "Thu", active: 11, idle: 1 },
  { day: "Fri", active: 8, idle: 4 },
];

const ActivityChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState("daily");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h6" fontWeight="bold">
          Your Activity
        </Typography>
        <Select
          value={timeRange}
          onChange={handleTimeRangeChange}
          size="small"
          sx={{ borderRadius: "8px", fontSize: "14px" }}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </Box>
      {/* Chart */}
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="active" fill="#8884d8" />
        <Bar dataKey="idle" fill="#82ca9d" />
      </BarChart>

      {/* Daily Summary */}
      <Grid container spacing={2} mt={3}>
        <Grid item xs={6}>
          <Box
            p={2}
            border="1px solid #f0f0f0"
            borderRadius="8px"
            textAlign="center"
          >
            <Typography variant="body2" fontWeight="bold">
              Daily Highest Active Hour
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              Monday, 23 July 2024
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <MdTrendingUp
                style={{
                  backgroundColor: "#34C75940",
                  color: "#4ABE6A",
                  fontSize: "24px",
                  padding: "2px",
                  borderRadius: "5px",
                }}
              />

              <Chip
                label="06 Hours"
                color="success"
                sx={{ fontWeight: "bold", fontSize: "14px" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            p={2}
            border="1px solid #f0f0f0"
            borderRadius="8px"
            textAlign="center"
          >
            <Typography variant="body2" fontWeight="bold">
              Daily Lowest Active Hour
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              Monday, 23 July 2024
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <MdTrendingDown
                style={{
                  backgroundColor: "#ECA54840",
                  color: "#ECA548",
                  fontSize: "24px",
                  padding: "2px",
                  borderRadius: "5px",
                }}
              />

              <Chip
                label="06 Hours"
                color="warning"
                sx={{ fontWeight: "bold", fontSize: "14px" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ActivityChart;
