"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  imageUrl: string;
  courseCode: string;
  pathwayNumber: string;
  title: string;
  modules: number;
  quizzes: number;
  duration: string;
  completion: number;
  scheduledTime: string;
  onViewDetails?: () => void;
}

export default function CourseCard({
  imageUrl,
  courseCode = "Course-04",
  pathwayNumber = "1.1",
  title = "Sustainable Business Practices",
  modules = 6,
  quizzes = 6,
  duration = "2 hr 30 mins",
  completion = 35,
  scheduledTime = "3:00 pm",
  onViewDetails = () => {},
}: CourseCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Card Image with Overlays */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={
            imageUrl || "https://source.unsplash.com/random/600x400/?classroom"
          }
          alt={title}
          sx={{ objectFit: "cover" }}
        />

        {/* Top Scheduled Time Tag */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "#F9A825",
            color: "#000",
            px: 2,
            py: 0.5,
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          Listed in scheduled {scheduledTime}
        </Box>

        {/* Bottom Tags */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            display: "flex",
            gap: 1,
          }}
        >
          {/* Course Code Tag */}
          <Box
            sx={{
              bgcolor: "#F9A825",
              color: "#000",
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            {courseCode}
          </Box>

          {/* Pathway Tag */}
          <Box
            sx={{
              bgcolor: "white",
              color: "#000",
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            Pathway {pathwayNumber}
          </Box>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ p: 2, pt: 2 }}>
        {/* Course Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            mb: 2,
            color: "#333",
          }}
        >
          {title}
        </Typography>

        {/* Course Metadata */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 2 },
              mb: 2,
            }}
          >
            {/* Modules */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <MenuBookIcon sx={{ color: "#F9A825", fontSize: "1.1rem" }} />
              <Typography variant="body2" sx={{ color: "#555" }}>
                {modules} Modules
              </Typography>
            </Box>

            {/* Quizzes */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <QuizIcon sx={{ color: "#F9A825", fontSize: "1.1rem" }} />
              <Typography variant="body2" sx={{ color: "#555" }}>
                {quizzes} Quiz
              </Typography>
            </Box>

            {/* Duration */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon sx={{ color: "#F9A825", fontSize: "1.1rem" }} />
              <Typography variant="body2" sx={{ color: "#555" }}>
                {duration}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Image
              src="/images/climate-action.png"
              width={40}
              height={40}
              alt="climate-action"
            />
            <Image
              src="/images/climate-action.png"
              width={40}
              height={40}
              alt="climate-action"
            />
          </Box>
        </Box>

        {/* Progress Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: 2,
            mt: 2,
          }}
        >
          {/* View Details Button */}
          <Box sx={{ width: "55%" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#555", fontWeight: 500 }}
              >
                Course Completion
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#555", fontWeight: 600 }}
              >
                {completion}%
              </Typography>
            </Box>

            {/* Progress Bar */}
            <Box sx={{ position: "relative", mb: 2 }}>
              <Box
                sx={{
                  height: "8px",
                  width: "100%",
                  bgcolor: "#f0f0f0",
                  borderRadius: "4px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "8px",
                  width: `${completion}%`,
                  bgcolor: "#F9A825",
                  borderRadius: "4px",
                }}
              />
            </Box>
          </Box>
          <Button
            component={Link}
            href={`/action/continue-learning`}
            variant="contained"
            fullWidth
            onClick={onViewDetails}
            startIcon={<VisibilityIcon />}
            sx={{
              bgcolor: "#1A3A40",
              color: "white",
              "&:hover": {
                bgcolor: "#0D2E33",
              },
              borderRadius: "30px",
              textTransform: "none",
              py: 1,
              fontWeight: 500,
              width: "45%",
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
