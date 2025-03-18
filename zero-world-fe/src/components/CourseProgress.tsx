"use client";

import { Box, Card, Typography, Chip, LinearProgress } from "@mui/material";
import type { CourseProgress } from "@/types/dashboard";

const courses: CourseProgress[] = [
  {
    id: "1",
    title: "Sustainable Business Practices",
    module: "Module 01",
    instructor: "Zaman Ovi",
    progress: 85,
    status: "on-going",
  },
  {
    id: "2",
    title: "Environmental Management",
    module: "Module 02",
    instructor: "Sarah Johnson",
    progress: 65,
    status: "not-started",
  },
  {
    id: "3",
    title: "Green Technology Innovation",
    module: "Module 03",
    instructor: "Michael Chen",
    progress: 45,
    status: "on-going",
  },
];

export default function CourseProgress() {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Performance On Essential Courses</Typography>
        <Box>
          <Chip label="Not Started" size="small" sx={{ mr: 1 }} />
          <Chip label="On Going" color="primary" size="small" />
        </Box>
      </Box>

      {courses.map((course) => (
        <Box
          key={course.id}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 1,
            bgcolor: "background.default",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box>
              <Typography variant="subtitle1">{course.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {course.module} • {course.instructor}
              </Typography>
            </Box>
            <Chip
              label={course.status === "on-going" ? "01" : "00"}
              size="small"
              color={course.status === "on-going" ? "primary" : "default"}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={course.progress}
              sx={{
                height: 6,
                borderRadius: 3,
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: "block" }}
            >
              {course.progress}% Completed
            </Typography>
          </Box>
        </Box>
      ))}
    </Card>
  );
}
