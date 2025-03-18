"use client";

import { Box, Card, Typography, Select, MenuItem } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { ActivityData } from "@/types/dashboard";

const data: ActivityData[] = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 8 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 5 },
  { day: "Sat", hours: 3 },
  { day: "Sun", hours: 2 },
];

export default function ActivityChart() {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Your Activity</Typography>
        <Select size="small" defaultValue="daily" sx={{ minWidth: 120 }}>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: 300, width: "100%" }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Bar dataKey="hours" fill="#1B4B4B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
