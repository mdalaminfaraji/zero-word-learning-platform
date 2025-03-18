import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface DataPoint {
  name: string | number;
  value: number;
}

interface StatCardProps {
  title: string;
  count: number;
  description: string;
  color: string;
  data: DataPoint[];
  percentage: number;
  showDots?: boolean;
}

// Demo data generator
export const generateDemoData = (
  min: number,
  max: number,
  points: number = 5
): DataPoint[] => {
  return Array.from({ length: points }, (_, i) => ({
    name: i + 1,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  description,
  color,
  data,
  percentage,
  showDots = true,
}) => {
  // Map color string to actual MUI color
  const getColor = () => {
    switch (color) {
      case "green":
        return "#27AE60";
      case "blue":
        return "#2F80ED";
      case "yellow":
        return "#F2994A";
      case "purple":
        return "#9B51E0";
      case "red":
        return "#EB5757";
      default:
        return "#27AE60";
    }
  };

  const chartColor = getColor();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        height: "100%",
        border: "1px solid #E7EAE9",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <Typography
            variant="h5"
            fontWeight="600"
            color="text.primary"
            sx={{ mb: 1 }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ opacity: 0.8 }}
          >
            {description}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${title}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.6} />
                  <stop
                    offset="100%"
                    stopColor={chartColor}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                hide={false}
                tick={{ fontSize: 12, fill: "#718096" }}
              />
              <YAxis
                hide={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#718096" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
                labelStyle={{ color: "#4A5568", fontWeight: 600 }}
                itemStyle={{ color: chartColor }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={3}
                dot={
                  showDots
                    ? {
                        stroke: chartColor,
                        strokeWidth: 2,
                        r: 4,
                        fill: "white",
                      }
                    : false
                }
                activeDot={{
                  r: 6,
                  stroke: chartColor,
                  strokeWidth: 2,
                  fill: "white",
                }}
                isAnimationActive={true}
                fill={`url(#gradient-${title})`}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          alignItems: "flex-end",
          mt: "auto",
          borderTop: "1px solid #E7EAE9",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: "text.primary" }}
          >
            {count}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ color: chartColor, mt: 0.5 }}
          >
            Total {title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "inline-flex",
            px: 2,
            py: 0.75,
            borderRadius: 2,
            bgcolor: `${chartColor}15`, // 15% opacity of the main color
            color: chartColor,
            fontSize: "0.875rem",
            fontWeight: "medium",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
          }}
        >
          {percentage}% this week
        </Box>
      </Box>
    </Paper>
  );
};

export default StatCard;
