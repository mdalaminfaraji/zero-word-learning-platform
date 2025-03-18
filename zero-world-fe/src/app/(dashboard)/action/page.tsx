"use client";
import CourseCard from "@/components/action/CourseCard";
import TabNavigation from "@/components/action/TabNavigation";
import { Box, Breadcrumbs, Grid2, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
const mockCourses = Array(6)
  .fill({
    id: "1",
    imageUrl: "/images/course-image.png",
    courseCode: "Course-04",
    pathwayNumber: "1.1",
    title: "Sustainable Business Practices",
    modules: 6,
    quizzes: 6,
    duration: "2 hr 30 mins",
    completion: 35,
    scheduledTime: "3:00 pm",
  })
  .map((course, index) => ({
    ...course,
    id: String(index + 1),
  }));
const ActionPage = () => {
  const [activeTab, setActiveTab] = useState("enrolled");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            style={{ fontWeight: 500, fontSize: 18 }}
          >
            Home
          </Link>
          <Typography color="text.primary" variant="h6">
            Analysis
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
        <TabNavigation onTabChange={handleTabChange} />
        <Box sx={{ mb: 2, fontWeight: 500, fontSize: 18, color: "#15181C" }}>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </Box>
        <Grid2 container spacing={3}>
          {mockCourses.map((course) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={course.id}>
              <CourseCard {...course} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default ActionPage;
