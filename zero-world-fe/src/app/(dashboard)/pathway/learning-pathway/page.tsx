"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  Breadcrumbs,
  LinearProgress,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

// Demo data for courses
const coursesData = [
  {
    id: 1,
    title: "Sustainable Business Practices",
    courseNumber: "06",
    mentor: "Kabir Hossain",
    skills: ["Skill-01", "Skill-02"],
    progress: 65,
  },
  {
    id: 2,
    title: "Sustainable Business Practices",
    courseNumber: "06",
    mentor: "Kabir Hossain",
    skills: ["Skill-01", "Skill-02"],
    progress: 65,
  },
  {
    id: 3,
    title: "Sustainable Business Practices",
    courseNumber: "06",
    mentor: "Kabir Hossain",
    skills: ["Skill-01", "Skill-02"],
    progress: 65,
  },
  {
    id: 4,
    title: "Sustainable Business Practices",
    courseNumber: "06",
    mentor: "Kabir Hossain",
    skills: ["Skill-01", "Skill-02"],
    progress: 65,
  },
  {
    id: 5,
    title: "Sustainable Business Practices",
    courseNumber: "06",
    mentor: "Kabir Hossain",
    skills: ["Skill-01", "Skill-02"],
    progress: 65,
  },
  {
    id: 6,
    title: "Sustainable Business Practices",
    courseNumber: "06",
    mentor: "Kabir Hossain",
    skills: ["Skill-01", "Skill-02"],
    progress: 65,
  },
];

// CourseItem Component
const CourseItem = ({
  title,
  courseNumber,
  mentor,
  skills,
  progress,
}: {
  title: string;
  courseNumber: string;
  mentor: string;
  skills: string[];
  progress: number;
}) => {
  return (
    <Box sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: 2,
          border: "1px solid #E7EAE9",
        }}
      >
        <Box
          sx={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
            alt={title}
            width={80}
            height={80}
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Course {courseNumber}:
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0 }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ width: 120, mr: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Mentor
          </Typography>
          <Typography variant="body2">{mentor}</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              sx={{
                bgcolor: "#F5F5F5",
                color: "#333",
                fontWeight: 500,
                borderRadius: 1,
              }}
            />
          ))}
        </Box>

        <Box sx={{ width: 120, mr: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Alignment
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 1,
                  bgcolor: "#F8B75D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  color: "#000",
                }}
              >
                👩‍💼
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ width: 140 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              {progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#E7EAE9",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: "#F8B75D",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default function LearningPathwayPage() {
  const [learningType, setLearningType] = useState<string>("essential");

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            href="/"
            style={{
              fontWeight: 500,
              fontSize: 18,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Typography color="text.primary" variant="h6">
            Pathway
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper
        elevation={0}
        sx={{ p: 3, borderRadius: 2, mb: 4, border: "1px solid #E7EAE9" }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Your Learning Pathway
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <Button
            onClick={() => setLearningType("essential")}
            variant={learningType === "essential" ? "contained" : "outlined"}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 4,
              bgcolor: learningType === "essential" ? "#1E383C" : "transparent",
              color: learningType === "essential" ? "white" : "#1E383C",
              borderColor: "#1E383C",
              "&:hover": {
                bgcolor:
                  learningType === "essential"
                    ? "#162A2E"
                    : "rgba(30, 56, 60, 0.04)",
                borderColor: "#1E383C",
              },
              textTransform: "none",
            }}
          >
            Essential Learning
          </Button>
          <Button
            onClick={() => setLearningType("recommended")}
            variant={learningType === "recommended" ? "contained" : "outlined"}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 4,
              bgcolor:
                learningType === "recommended" ? "#E8F4F6" : "transparent",
              color: "#1E383C",
              borderColor: "#1E383C",
              "&:hover": {
                bgcolor:
                  learningType === "recommended"
                    ? "#D2E8EC"
                    : "rgba(30, 56, 60, 0.04)",
                borderColor: "#1E383C",
              },
              textTransform: "none",
            }}
          >
            Recommended Learning
          </Button>
        </Box>

        <Box sx={{ border: "1px solid #E7EAE9", borderRadius: 2, p: 3 }}>
          {coursesData.map((course) => (
            <CourseItem
              key={course.id}
              title={course.title}
              courseNumber={course.courseNumber}
              mentor={course.mentor}
              skills={course.skills}
              progress={course.progress}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
