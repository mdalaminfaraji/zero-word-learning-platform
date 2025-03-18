"use client";
import React from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CourseRow from "./CourseRow";

const courses = [
  {
    courseNumber: "01",
    courseName: "Sustainable Business Practices",
    moduleName: "Module-01",
    userName: "Zaman Ovi",
    progress: 80,
    rank: 1,
  },
  {
    courseNumber: "01",
    courseName: "Sustainable Business Practices",
    moduleName: "Module-01",
    userName: "Zaman Ovi",
    progress: 80,
    rank: 1,
  },
  {
    courseNumber: "01",
    courseName: "Sustainable Business Practices",
    moduleName: "Module-01",
    userName: "Zaman Ovi",
    progress: 80,
    rank: 1,
  },
  {
    courseNumber: "01",
    courseName: "Sustainable Business Practices",
    moduleName: "Module-01",
    userName: "Zaman Ovi",
    progress: 80,
    rank: 1,
  },
  {
    courseNumber: "01",
    courseName: "Sustainable Business Practices",
    moduleName: "Module-01",
    userName: "Zaman Ovi",
    progress: 80,
    rank: 1,
  },
  {
    courseNumber: "01",
    courseName: "Sustainable Business Practices",
    moduleName: "Module-01",
    userName: "Zaman Ovi",
    progress: 80,
    rank: 1,
  },
];

const CourseList: React.FC = () => {
  const [filter, setFilter] = React.useState("on-going");

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box
      bgcolor="#FFFFFF"
      borderRadius={2}
      sx={{
        border: "1px solid #E7EAE9",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        sx={{
          borderBottom: "1px solid #E7EAE9",
        }}
      >
        <Typography variant="h6" fontWeight="600" sx={{ fontSize: "18px" }}>
          Performance On Essential Courses
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="course filter"
          size="small"
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              borderRadius: "25px !important",
              border: "none",
              mx: 0.5,
              py: 0.5,
              px: 2,
              "&.Mui-selected": {
                backgroundColor: "#1E383C",
                color: "#fff",
              },
              "&:not(.Mui-selected)": {
                backgroundColor: "#F5F5F5",
                color: "#333",
              },
            },
          }}
        >
          <ToggleButton value="not-started" aria-label="not started">
            Not Started
          </ToggleButton>
          <ToggleButton value="on-going" aria-label="on going">
            On Going
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* List of Courses */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {courses.map((course, index) => (
          <CourseRow
            key={index}
            courseNumber={course.courseNumber}
            courseName={course.courseName}
            moduleName={course.moduleName}
            userName={course.userName}
            progress={course.progress}
            rank={course.rank}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CourseList;
