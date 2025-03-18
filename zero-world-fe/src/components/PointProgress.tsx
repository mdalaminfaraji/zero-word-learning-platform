"use client";

import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, useMemo } from "react";
import CustomSelect from "./ui/CustomSelect";

interface GaugeChartProps {
  score: number; // Total score
  percentage: number; // Completion percentage (0-100)
}

export default function GaugeChart({ score, percentage }: GaugeChartProps) {
  const [selectedMetric, setSelectedMetric] = useState("Understanding");

  // Select options
  const metricOptions = [
    { value: "Understanding", label: "Understanding" },
    { value: "Developing", label: "Developing" },
    { value: "Performing", label: "Performing" },
  ];

  // Chart configuration
  const COLORS = ["#1976D2", "#F5F5F5"]; // Blue progress and lighter grey background
  const startAngle = 180; // Start for the semicircle
  const endAngle = 0; // End for the semicircle

  // Chart data
  const data = [{ value: percentage }, { value: 100 - percentage }];

  // Needle pointer angle calculation
  const needleAngle = 180 * (percentage / 100);

  // Needle positioning style
  const needleStyle = useMemo(
    () => ({
      transform: `translate(-40%, -40%) rotate(${needleAngle}deg)`,
    }),
    [needleAngle]
  );

  // Generate tick marks for the gauge - this is safe because it's only rendering Box components without hooks
  const renderTickMarks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i <= 10; i++) {
      const angle = 180 * (i / 10);
      const isLonger = i % 5 === 0;
      ticks.push(
        <Box
          key={`tick-${i}`}
          sx={{
            position: "absolute",
            bottom: "50%",
            left: "50%",
            height: isLonger ? "10px" : "5px",
            width: "1px",
            bgcolor: "#D0D0D0",
            transformOrigin: "bottom center",
            transform: `translate(-50%, 0) rotate(${angle}deg)`,
            zIndex: 0,
          }}
        />
      );
    }
    return ticks;
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.paper",
        borderRadius: 2,
        border: "1px solid #E7EAE9",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
          borderBottom: "1px solid #E7EAE9",
        }}
      >
        <Typography
          variant="body1"
          fontWeight="500"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#1976D2",
              mr: 1,
            }}
          />
          Point Progress
        </Typography>
        <Box sx={{ width: 150 }}>
          <CustomSelect
            options={metricOptions}
            value={selectedMetric}
            onChange={(value) => setSelectedMetric(value)}
          />
        </Box>
      </Box>

      {/* Gauge Chart */}
      <Box sx={{ position: "relative", height: 200 }}>
        {/* Tick marks */}
        {renderTickMarks}

        {/* Circular Progress */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius="60%"
              outerRadius="80%"
              dataKey="value"
              strokeWidth={0}
              cornerRadius={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Needle - Tapered Design */}
        <Box
          sx={{
            position: "absolute",
            bottom: "50%",
            left: "50%",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "60px solid #FF8C42",
            transformOrigin: "40% 120%",
            zIndex: 1,
            ...needleStyle,
            filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.3))",
          }}
        />

        {/* Central Circle */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 26,
            height: 26,
            borderRadius: "50%",
            bgcolor: "#FF8C42", // Orange
            border: "3px solid white",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
            zIndex: 2,
          }}
        />
      </Box>

      {/* Total Score - Layout matching image */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: "1rem",
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Total Score:{" "}
          <span
            style={{
              fontWeight: 600,
              color: "#1E1E1E",
              marginLeft: 5,
              fontSize: 18,
            }}
          >
            {score}
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
