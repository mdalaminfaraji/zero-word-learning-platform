"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import CustomSelect from "@/components/ui/CustomSelect";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Demo data for activity hours
const activityData = [
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 8 },
  { day: "Mon", hours: 8 },
  { day: "Tue", hours: 8 },
  { day: "Wed", hours: 8 },
  { day: "Thr", hours: 10 },
  { day: "Fri", hours: 10 },
];

// Options for time frame select
const timeframeOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export default function YourActivity() {
  const [timeframe, setTimeframe] = useState<string>("daily");

  return (
    <Box sx={{ borderRadius: 2, height: "100%", border: "1px solid #e0e0e0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Your Activity
        </Typography>
        <Box sx={{ width: 120 }}>
          <CustomSelect
            options={timeframeOptions}
            value={timeframe}
            onChange={(value) => setTimeframe(value)}
          />
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Bar Chart using Recharts */}
        <Box sx={{ height: 250, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={activityData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              barSize={30}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={[0, 2, 4, 6, 8, 10, 12]}
                tickFormatter={(value) => `${value} hr`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(30, 58, 95, 0.1)" }}
                contentStyle={{
                  backgroundColor: "#2C606A",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px",
                }}
                labelStyle={{ color: "white", fontWeight: "bold" }}
                itemStyle={{ color: "white" }}
                formatter={(value) => [`${value} hours`]}
              />
              <Bar
                dataKey="hours"
                fill="#2C606A"
                radius={[8, 8, 0, 0]}
                background={{ fill: "#D2E8EC", radius: 8 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Activity Metrics */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          {/* Highest Active Hour */}
          <Box
            sx={{
              width: "48%",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight="medium">
              Daily Highest Active Hour
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              gutterBottom
            >
              Monday, 23 July 2024
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#e6f7ec",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MdTrendingUp style={{ color: "#4caf50", fontSize: 20 }} />
              </Box>
              <Box
                sx={{
                  bgcolor: "#4caf50",
                  color: "white",
                  borderRadius: 10,
                  px: 2,
                  py: 0.5,
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  06 Hours
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Lowest Active Hour */}
          <Box
            sx={{
              width: "48%",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight="medium">
              Daily Lowest Active Hour
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              gutterBottom
            >
              Monday, 23 July 2024
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#fff8e1",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MdTrendingDown style={{ color: "#ffa726", fontSize: 20 }} />
              </Box>
              <Box
                sx={{
                  bgcolor: "#ffa726",
                  color: "white",
                  borderRadius: 10,
                  px: 2,
                  py: 0.5,
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  06 Hours
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
