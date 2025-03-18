/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Box, Breadcrumbs, Typography, Chip, Button } from "@mui/material";
import Link from "next/link";
import PathwayCard from "@/components/pathway/PathwayCard";
import PathwayProgressCard from "@/components/pathway/PathwayProgressCard";
import PathwayDetail from "@/components/pathway/PathwayDetail";
import RecommendedCourse from "@/components/pathway/RecommendedCourse";

// Mock data
const pathwayData = [
  {
    status: "Understanding",
    number: 1,
    title: "Foundational Skill",
    essentialCourses: 6,
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna. Lorem ipsum dolor sit amet consectetur.dolor magna.Lorem ipsum dolor sit amet consectetur.",
  },
  {
    status: "Developing",
    number: 2,
    title: "Pathway 2",
    essentialCourses: 4,
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna.",
  },
  {
    status: "Performing",
    number: 3,
    title: "Pathway 3",
    essentialCourses: 4,
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna.",
  },
  {
    status: "Leading",
    number: 4,
    title: "Pathway 4",
    essentialCourses: 4,
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna.",
  },
];

const pathwayDetails = [
  { title: "Pathway 1.1: Foundational Skill", progress: 4 },
  { title: "Pathway 1.2: Technical Skill", progress: 3 },
  { title: "Pathway 1.3: Behavioural Skill", progress: 3 },
  { title: "Pathway 1.4: Influential Skill", progress: 3 },
];

const recommendedCourses = [
  {
    title: "Introduction to Sustainable Business Practices",
    instructor: "Md. Karim",
    modules: 4,
    quiz: 4,
    duration: "2hr 30 mins",
    progress: 57,
    tags: ["Energy", "Water", "Climate", "Waste", "Biodiversity"],
    imageSrc:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3",
  },
  {
    title: "Introduction to Sustainable Business Practices",
    instructor: "Md. Karim",
    modules: 4,
    quiz: 4,
    duration: "2hr 30 mins",
    progress: 57,
    tags: ["Energy", "Water", "Climate", "Waste", "Biodiversity"],
    imageSrc:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3",
  },
  {
    title: "Introduction to Sustainable Business Practices",
    instructor: "Md. Karim",
    modules: 4,
    quiz: 4,
    duration: "2hr 30 mins",
    progress: 57,
    tags: ["Energy", "Water", "Climate", "Waste", "Biodiversity"],
    imageSrc:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3",
  },
];

export default function PathwayPage() {
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

      {/* Main Container */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { md: "1.7fr 3fr" },
          border: "1px solid #E7EAE9",
          borderRadius: 2,
          p: 2,
        }}
      >
        {/* Understanding Section */}
        <Box>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              border: "1px solid #E7EAE9",
            }}
          >
            <Box
              sx={{
                bgcolor: "white",

                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                  borderBottom: "1px solid #E7EAE9",
                  p: 3,
                }}
              >
                <Chip
                  label="Understanding"
                  sx={{
                    bgcolor: "#F8B75D",
                    color: "#000",
                    fontWeight: 500,
                    px: 1,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
                  Pathway 1
                </Typography>
              </Box>

              <Box sx={{ px: 3 }}>
                <Box
                  sx={{
                    bgcolor: "#E8F4F6",
                    borderRadius: 1,
                    p: 2,
                    mt: 2,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Essential Courses : 06
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer
                  dolor magna. Lorem ipsum dolor sit amet consectetur.dolor
                  magna.Lorem ipsum dolor sit amet consectetur.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ p: 3 }}>
              {pathwayDetails.map((detail, index) => (
                <React.Fragment key={index}>
                  <PathwayDetail
                    title={detail.title}
                    progress={detail.progress}
                  />
                  {index < pathwayDetails.length - 1 && (
                    <Box sx={{ height: 1, bgcolor: "#E7EAE9", my: 1 }} />
                  )}
                </React.Fragment>
              ))}

              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                  variant="contained"
                  component={Link}
                  href="/pathway/start-learning"
                  sx={{
                    bgcolor: "#1E383C",
                    color: "white",
                    fontWeight: 500,
                    borderRadius: 6,
                    px: 4,
                    "&:hover": {
                      bgcolor: "#162A2E",
                    },
                  }}
                >
                  Start Learning
                </Button>
              </Box>
            </Box>
          </Box>
          <PathwayProgressCard progress={50} />
        </Box>

        {/* Developing, Performing, Leading Section */}
        <Box>
          <Box>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
              }}
            >
              {pathwayData.slice(1).map((pathway, index) => (
                <PathwayCard
                  key={index}
                  status={pathway.status as any}
                  number={pathway.number}
                  title={pathway.title}
                  essentialCourses={pathway.essentialCourses}
                  description={pathway.description}
                />
              ))}
            </Box>
          </Box>

          {/* Recommended Courses Section */}
          <Box sx={{ mt: 5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Recommended Courses
              </Typography>
              <Chip
                label="Recently Added"
                sx={{
                  bgcolor: "#1E383C",
                  color: "white",
                  borderRadius: 4,
                  fontWeight: 500,
                }}
              />
            </Box>

            <Box>
              {recommendedCourses.map((course, index) => (
                <RecommendedCourse
                  key={index}
                  title={course.title}
                  instructor={course.instructor}
                  modules={course.modules}
                  quiz={course.quiz}
                  duration={course.duration}
                  progress={course.progress}
                  tags={course.tags}
                  imageSrc={course.imageSrc}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
