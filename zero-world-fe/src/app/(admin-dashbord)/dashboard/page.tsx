/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { Box, Typography, Paper, Grid2 } from "@mui/material";
import StatCard, { generateDemoData } from "@/components/dashboard/StatCard";
import TimePeriodSelector from "@/components/dashboard/TimePeriodSelector";
import ActionButton from "@/components/dashboard/ActionButton";
import CourseSendPopup from "@/components/dashboard/CourseSendPopup";

export default function AdminDashboard() {
  const [timePeriod, setTimePeriod] = useState("Daily");
  const [isCourseSendPopupOpen, setIsCourseSendPopupOpen] = useState(false);
  const courseSendButtonRef = useRef<HTMLButtonElement | null>(null);
  console.log(timePeriod);
  // Mock data for courses, modules, and audiences
  const mockCourses = [
    { id: "1", name: "Introduction to Web Development" },
    { id: "2", name: "Advanced JavaScript Programming" },
    { id: "3", name: "React Fundamentals" },
    { id: "4", name: "Node.js Backend Development" },
    { id: "5", name: "Database Design & SQL" },
    { id: "6", name: "UI/UX Design Principles" },
  ];

  const mockModules = [
    { id: "1", name: "Module 1: Fundamentals" },
    { id: "2", name: "Module 2: Intermediate" },
    { id: "3", name: "Module 3: Advanced" },
    { id: "4", name: "Module 4: Capstone Project" },
  ];

  const mockAudiences = [
    { id: "1", name: "All Students" },
    { id: "2", name: "Beginners" },
    { id: "3", name: "Intermediate Learners" },
    { id: "4", name: "Advanced Learners" },
    { id: "5", name: "Enterprise Clients" },
  ];

  // Mock data for each card
  const cardData = [
    {
      title: "Employees",
      count: 200,
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      color: "green",
      data: generateDemoData(5, 20, 5),
      percentage: 10,
    },
    {
      title: "Customers",
      count: 1850,
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      color: "blue",
      data: generateDemoData(10, 30, 5),
      percentage: 15,
    },
    {
      title: "Suppliers",
      count: 125,
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      color: "purple",
      data: generateDemoData(5, 15, 5),
      percentage: 8,
    },
    {
      title: "Investors",
      count: 48,
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      color: "yellow",
      data: generateDemoData(3, 12, 5),
      percentage: 20,
    },
    {
      title: "Community",
      count: 3250,
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      color: "green",
      data: generateDemoData(15, 40, 5),
      percentage: 12,
    },
    {
      title: "Other",
      count: 76,
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      color: "red",
      data: generateDemoData(2, 10, 5),
      percentage: 5,
    },
  ];

  const handleSendCourse = () => {
    setIsCourseSendPopupOpen(true);
  };

  const handleCloseSendPopup = () => {
    setIsCourseSendPopupOpen(false);
  };

  const handleSendCourseSubmit = (data: {
    courses: string[];
    modules: string[];
    audiences: string[];
  }) => {
    console.log("Sending courses to audience:", data);
    // Here you would typically make an API call to send the courses
  };

  return (
    <Box sx={{ bgcolor: "#F9FAFB", position: "relative" }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E7EAE9",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #E7EAE9",
            p: 3,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Track, Manage your all work by dashboard
            </Typography>
          </Box>
          <TimePeriodSelector onChange={setTimePeriod} defaultPeriod="Daily" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 3 }}>
          <ActionButton
            text="Course Send to Audience"
            onClick={handleSendCourse}
            ref={courseSendButtonRef}
          />
        </Box>
        <Grid2 container spacing={3} sx={{ p: 3 }}>
          {cardData.map((card, index) => (
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <StatCard
                title={card.title}
                count={card.count}
                description={card.description}
                color={card.color}
                data={card.data}
                percentage={card.percentage}
                showDots={true}
              />
            </Grid2>
          ))}
        </Grid2>
      </Paper>

      {/* Course Send Popup */}
      <CourseSendPopup
        isOpen={isCourseSendPopupOpen}
        onClose={handleCloseSendPopup}
        onSend={handleSendCourseSubmit}
        courses={mockCourses}
        modules={mockModules}
        audiences={mockAudiences}
        buttonRef={courseSendButtonRef as any}
      />
    </Box>
  );
}
