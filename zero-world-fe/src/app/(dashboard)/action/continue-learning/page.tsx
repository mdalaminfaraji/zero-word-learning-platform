"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Chip,
  Grid2,
} from "@mui/material";
import CourseCardVideo from "@/components/action/CourseCard";
import Link from "next/link";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Module progress component
const ModuleProgress = () => {
  const modules = [
    { id: "01", active: true },
    { id: "02", active: true },
    { id: "03", active: true },
    { id: "04", active: false },
    { id: "05", active: false },
    { id: "06", active: false },
  ];

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography variant="subtitle1" fontWeight={500} mr={2}>
        Module Progress
      </Typography>
      {modules.map((module) => (
        <Chip
          key={module.id}
          label={module.id}
          sx={{
            borderRadius: "50%",
            width: 45,
            height: 45,
            bgcolor: module.active
              ? module.id === "03"
                ? "#F9A825"
                : "#4CAF50"
              : "#E0E0E0",
            color: module.active ? "white" : "#666",
            fontWeight: 500,
            "&.MuiChip-root": {
              fontSize: "0.875rem",
            },
          }}
        />
      ))}
    </Box>
  );
};

// Course card component for right sidebar
const CourseCard = ({
  courseId,
  title,
  time,
  webDesign,
}: {
  courseId: string;
  title: string;
  time: string;
  webDesign: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 1,
        p: 1,
        bgcolor: "#f8f9fa",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/course-image.png"
        width={60}
        height={65}
        alt={title}
        style={{ objectFit: "cover", borderRadius: 12 }}
      />
      <Box sx={{ pb: 1, pl: 2, width: "100%" }}>
        <Chip
          label={`Course-${courseId}`}
          size="small"
          sx={{
            bgcolor: "#F9A825",
            color: "black",
            fontSize: "0.7rem",
            height: 22,
          }}
        />
        <Typography variant="subtitle2" fontWeight={500}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {time} | {webDesign}
        </Typography>
      </Box>
    </Box>
  );
};
const mockCourses = Array(3)
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

export default function ContinueLearningPage() {
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
          <Link
            color="inherit"
            href="/action"
            style={{ fontWeight: 500, fontSize: 18 }}
          >
            Action
          </Link>
          <Typography color="text.primary" variant="h6">
            Continue Learning
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ px: 2, pb: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 3,
            pb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Continued Learning
          </Typography>
          <ModuleProgress />
        </Box>

        {/* Main course content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 2,
              width: { xs: "100%", lg: "65%" },
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              gap: 2,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Image
                src="/images/course-image.png"
                width={350}
                height={300}
                alt="Course video"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "rgba(255,255,255,0.8)",
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 40, color: "#333" }} />
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  pt: 1,
                  pb: 2,
                }}
              >
                <Chip
                  label="Course-01"
                  size="small"
                  sx={{ bgcolor: "#F9A825", color: "black", fontWeight: 500 }}
                />
                <Chip
                  label="Module-01"
                  size="small"
                  sx={{ bgcolor: "#90CAF9", color: "black", fontWeight: 500 }}
                />
                <Chip
                  label="Pathway 1.2"
                  size="small"
                  sx={{ bgcolor: "white", color: "black", fontWeight: 500 }}
                />
              </Box>
              <Typography
                variant="h5"
                fontWeight={600}
                mb={2}
                sx={{ borderBottom: "1px solid #e0e0e0", pb: 2 }}
              >
                Sustainable Business Practices
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={2}>
                Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer
                dolor magna. Lorem ipsum dolor sit amet consectetur Lorem ipsum
                dolor sit amet consectetur.
              </Typography>

              <Box sx={{ color: "#F9A825", mb: 2 }}>
                <Typography variant="subtitle1">
                  Listed in scheduled 2:00 pm
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ width: "60%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      Course Completion
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      35%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      height: 8,
                      bgcolor: "#f0f0f0",
                      borderRadius: 4,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "35%",
                        bgcolor: "#F9A825",
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  component={Link}
                  href={`/action/course-view`}
                  sx={{
                    bgcolor: "#1A3A40",
                    color: "white",
                    borderRadius: 30,
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#0D2E33",
                    },
                  }}
                >
                  Go to the course
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Sidebar - Right side */}
          <Box sx={{ width: { xs: "100%", lg: "35%" } }}>
            <Box
              sx={{
                px: 2,
                pt: 1,
                pb: 0.5,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={1}>
                Recommended Courses
              </Typography>

              <CourseCard
                courseId="01"
                title="Sustainable Business Practices"
                time="09:00 AM"
                webDesign="Web Design"
              />

              <CourseCard
                courseId="01"
                title="Sustainable Business Practices"
                time="09:00 AM"
                webDesign="Web Design"
              />

              <CourseCard
                courseId="01"
                title="Sustainable Business Practices"
                time="09:00 AM"
                webDesign="Web Design"
              />
            </Box>
          </Box>
        </Box>
        <Typography variant="h6" fontWeight={600} mb={1} sx={{ mt: 2 }}>
          Enrolled Courses
        </Typography>
        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          {mockCourses.map((course) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={course.id}>
              <CourseCardVideo {...course} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
}
