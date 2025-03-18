"use client";
import React, { useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import CustomSelect from "@/components/ui/CustomSelect";

// Demo data for courses
const courseData = [
  {
    id: "01",
    title: "Sustainable Business Practices",
    module: "Module-01",
    progress: 80,
  },
  {
    id: "02",
    title: "Sustainable Business Practices",
    module: "Module-01",
    progress: 70,
  },
  {
    id: "03",
    title: "Sustainable Business Practices",
    module: "Module-01",
    progress: 68,
  },
  {
    id: "04",
    title: "Sustainable Business Practices",
    module: "Module-01",
    progress: 40,
  },
];

// Options for filter selects
const filterOptions = [
  {
    value: "pathway",
    label: "Pathway",
    options: [
      { value: "all", label: "All Pathways" },
      { value: "course", label: "Course" },
      { value: "module", label: "Module" },
    ],
  },
  //   {
  //     value: "course",
  //     label: "Course",
  //     options: [
  //       { value: "all", label: "All Courses" },
  //       { value: "course1", label: "Course 1" },
  //       { value: "course2", label: "Course 2" },
  //     ],
  //   },
  //   {
  //     value: "module",
  //     label: "Module",
  //     options: [
  //       { value: "all", label: "All Modules" },
  //       { value: "module1", label: "Module 1" },
  //       { value: "module2", label: "Module 2" },
  //     ],
  //   },
];

// Status options
const statusOptions = [
  { value: "started", label: "Started" },
  { value: "completed", label: "Completed" },
  { value: "not-completed", label: "Not Completed" },
];

export default function PerformanceOnLearning() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFilter, setSelectedFilter] = useState<string>("pathway");
  const [selectedFilterValue, setSelectedFilterValue] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("not-completed");

  // Function to determine the color of the progress circle based on progress percentage
  const getProgressColor = (progress: number) => {
    if (progress < 50) return "#FF5252"; // Red for low progress
    if (progress < 75) return "#4CAF50"; // Green for medium progress
    return "#4CAF50"; // Green for high progress
  };

  return (
    <Box sx={{ borderRadius: 2, height: "100%", border: "1px solid #e0e0e0" }}>
      {/* Header */}
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
          Performance On Learning
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Filter type and dropdown */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* Filter type selector */}
            {/* <Box sx={{ display: "flex", gap: 0.5 }}>
              {filterOptions.map((filter) => (
                <Box
                  key={filter.value}
                  onClick={() => {
                    setSelectedFilter(filter.value);
                    setSelectedFilterValue(filter.options[0].value);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontWeight:
                      selectedFilter === filter.value ? "bold" : "normal",
                    textDecoration:
                      selectedFilter === filter.value ? "underline" : "none",
                    color:
                      selectedFilter === filter.value ? "#2C606A" : "inherit",
                  }}
                >
                  <Typography variant="body2">{filter.label}</Typography>
                </Box>
              ))}
            </Box> */}

            {/* Filter dropdown */}
            <Box sx={{ width: 150 }}>
              <CustomSelect
                options={
                  filterOptions.find((opt) => opt.value === selectedFilter)
                    ?.options || []
                }
                value={selectedFilterValue}
                onChange={(value) => {
                  setSelectedFilterValue(value);
                  // You could add filtering logic here based on the selected value
                }}
                placeholder={
                  filterOptions.find((opt) => opt.value === selectedFilter)
                    ?.label || ""
                }
              />
            </Box>
          </Box>

          {/* Status buttons */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {statusOptions.map((status) => (
              <Box
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                sx={{
                  px: { xs: 1, xl: 2 },
                  py: 1,
                  borderRadius: 50,
                  cursor: "pointer",
                  bgcolor:
                    selectedStatus === status.value
                      ? status.value === "not-completed"
                        ? "#2C606A"
                        : "white"
                      : "white",
                  color:
                    selectedStatus === status.value
                      ? status.value === "not-completed"
                        ? "white"
                        : "black"
                      : "black",
                  border: "1px solid #e0e0e0",
                  fontWeight:
                    selectedStatus === status.value ? "bold" : "normal",
                }}
              >
                <Typography variant="body2">{status.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Course List */}
      <Box sx={{ p: 2 }}>
        {courseData.map((course) => (
          <Paper
            key={course.id}
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Course Info */}
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Course {course.id}: {course.title}
              </Typography>
            </Box>

            {/* Module Badge */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Box
                sx={{
                  bgcolor: "#90CAF9",
                  color: "#1565C0",
                  borderRadius: 50,
                  px: 2,
                  py: 0.5,
                }}
              >
                <Typography variant="body2">{course.module}</Typography>
              </Box>

              {/* Progress Circle */}
              <Box sx={{ position: "relative", width: 40, height: 40 }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={40}
                  thickness={4}
                  sx={{ color: "#f0f0f0", position: "absolute" }}
                />
                <CircularProgress
                  variant="determinate"
                  value={course.progress}
                  size={40}
                  thickness={4}
                  sx={{
                    color: getProgressColor(course.progress),
                    position: "absolute",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption" fontWeight="bold">
                    {course.progress}%
                  </Typography>
                </Box>
              </Box>

              {/* Course Number Badge */}
              <Box
                sx={{
                  bgcolor: "#FFE0B2",
                  color: "#E65100",
                  borderRadius: 50,
                  px: 2,
                  py: 0.5,
                  minWidth: 40,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2">{course.id}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
