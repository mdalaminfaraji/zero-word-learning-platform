"use client";
import React, { useState } from "react";
import { Typography, Box, Paper, Chip } from "@mui/material";
import CustomSelect from "@/components/ui/CustomSelect";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdTrendingUp } from "react-icons/md";
const cardData = [
  {
    title: "Understanding",
    status: "Finished 03 Courses",
    statusColor: "#ECA548",
    iconBgColor: "#FBE9D1",
    iconColor: "#F6AD55",
    chipBgColor: "#F6AD55",
    progress: "15 Out of 30",
  },
  {
    title: "Developing",
    status: "Finished 03 Courses",
    statusColor: "primary",
    iconBgColor: "#DEF7EC",
    iconColor: "#68D391",
    chipBgColor: "#68D391",
    progress: "15 Out of 30",
  },
  {
    title: "Performing",
    status: "Not Started Course",
    statusColor: "error",
    iconBgColor: "#FEEBF3",
    iconColor: "#F687B3",
    chipBgColor: "#F687B3",
    progress: "00 Out of 30",
  },
  {
    title: "Leading",
    status: "Finished 06 Courses",
    statusColor: "primary",
    iconBgColor: "#E6F6FF",
    iconColor: "#4299E1",
    chipBgColor: "#4299E1",
    progress: "15 Out of 30",
  },
];

// Performance Analysis Data
const lineChartData = [
  {
    name: "Week-1",
    understanding: 5,
    developing: 10,
    performing: 15,
    leading: 8,
  },
  {
    name: "Week-2",
    understanding: 20,
    developing: 40,
    performing: 30,
    leading: 15,
  },
  {
    name: "Week-3",
    understanding: 30,
    developing: 55,
    performing: 45,
    leading: 25,
  },
  {
    name: "Week-4",
    understanding: 40,
    developing: 45,
    performing: 60,
    leading: 35,
  },
  {
    name: "Week-5",
    understanding: 30,
    developing: 85,
    performing: 65,
    leading: 45,
  },
  {
    name: "Week-6",
    understanding: 55,
    developing: 65,
    performing: 80,
    leading: 60,
  },
];

// Custom Tooltip for LineChart
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    name: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#1e3a5f",
          color: "white",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Jan 12, 2024
        </Typography>
        <Typography variant="body2" sx={{ color: "#f8cb5a" }}>
          Marks 75
        </Typography>
      </Paper>
    );
  }
  return null;
};

export default function PerformanceAnalysis() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<string>("weekly");
  return (
    <Box sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
      <Box sx={{ p: 2.5, mb: 1, borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="h5" fontWeight="bold">
          Course Activity Hours
        </Typography>
      </Box>
      <Box sx={{ p: 1, display: "flex", columnGap: 1, width: "100%", mb: 1.5 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            width: "70%",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Performance Analysis
            </Typography>
            <Box display="flex" gap={2}>
              {/* Course selector */}
              <Box sx={{ width: 120 }}>
                <CustomSelect
                  options={[
                    { value: "all", label: "All Courses" },
                    { value: "course1", label: "Course 1" },
                    { value: "course2", label: "Course 2" },
                  ]}
                  value={selectedCourse}
                  onChange={(value) => setSelectedCourse(value)}
                  placeholder="Course"
                />
              </Box>

              {/* Time period selector */}
              <Box sx={{ width: 120 }}>
                <CustomSelect
                  options={[
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ]}
                  value={selectedTimePeriod}
                  onChange={(value) => setSelectedTimePeriod(value)}
                  placeholder="Weekly"
                />
              </Box>
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={lineChartData}
              margin={{ top: 5, right: 40, left: 1, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="understanding"
                stroke="#4299e1"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 8,
                  fill: "#4299e1",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="developing"
                stroke="#68d391"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 8,
                  fill: "#68d391",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="performing"
                stroke="#f687b3"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 8,
                  fill: "#f687b3",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="leading"
                stroke="#f6ad55"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 8,
                  fill: "#f6ad55",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ width: "30%" }}>
          {/* Phase Progress Data */}
          {cardData.map((phase, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 1,
                mt: index > 0 ? 2 : 0,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {phase.title}
                </Typography>
                <Typography
                  //   variant="caption"
                  color={phase.statusColor}
                  fontWeight="medium"
                  sx={{
                    ml: 2,
                    fontSize: { xs: 8, sm: 10, xl: 12 },
                  }}
                >
                  {phase.status}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box
                  sx={{
                    backgroundColor: phase.iconBgColor,
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                  }}
                >
                  <MdTrendingUp
                    style={{ color: phase.iconColor, fontSize: 24 }}
                  />
                </Box>

                <Chip
                  label={phase.progress}
                  sx={{
                    backgroundColor: phase.chipBgColor,
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    px: 1,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
