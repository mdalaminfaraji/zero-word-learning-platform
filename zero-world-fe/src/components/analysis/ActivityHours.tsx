"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  LinearProgress,
} from "@mui/material";

// Demo data for courses
const coursesData = [
  {
    id: "01",
    title: "Sustainable Business Practices",
    hours: 6,
    progress: 60,
  },
  {
    id: "02",
    title: "Sustainable Business Practices",
    hours: 6,
    progress: 55,
  },
  {
    id: "03",
    title: "Sustainable Business Practices",
    hours: 6,
    progress: 50,
  },
  {
    id: "04",
    title: "Sustainable Business Practices",
    hours: 6,
    progress: 45,
  },
  {
    id: "05",
    title: "Sustainable Business Practices",
    hours: 6,
    progress: 40,
  },
];

export default function ActivityHours() {
  const [activeTab, setActiveTab] = useState<"Course" | "Module">("Course");

  return (
    <Box sx={{ borderRadius: 2, height: "100%", border: "1px solid #e0e0e0" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            borderBottom: "1px solid #e0e0e0",
            p: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Activity Hours
          </Typography>
          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={() => setActiveTab("Course")}
              sx={{
                backgroundColor:
                  activeTab === "Course" ? "#1e3a5f" : "transparent",
                color: activeTab === "Course" ? "white" : "inherit",
                borderColor: "#e0e0e0",
                "&:hover": {
                  backgroundColor:
                    activeTab === "Course" ? "#1e3a5f" : "#f5f5f5",
                },
              }}
            >
              Course
            </Button>
            <Button
              onClick={() => setActiveTab("Module")}
              sx={{
                backgroundColor:
                  activeTab === "Module" ? "#1e3a5f" : "transparent",
                color: activeTab === "Module" ? "white" : "inherit",
                borderColor: "#e0e0e0",
                "&:hover": {
                  backgroundColor:
                    activeTab === "Module" ? "#1e3a5f" : "#f5f5f5",
                },
              }}
            >
              Module
            </Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ px: 1, py: 1 }}>
          {coursesData.map((course) => (
            <Box
              key={course.id}
              sx={{
                p: 2,
                mb: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary" variant="body2">
                Course {course.id}:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{ width: "80%" }}
                >
                  {course.title}
                </Typography>

                <Box sx={{ width: "20%", mr: 0.5 }}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "right" }}
                  >
                    {course.hours} Hrs
                  </Typography>
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#f6ad55",
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
