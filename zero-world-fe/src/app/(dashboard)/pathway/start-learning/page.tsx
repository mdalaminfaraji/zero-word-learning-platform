"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  Breadcrumbs,
  Grid2,
  Drawer,
  IconButton,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Link from "next/link";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Demo data for courses
const coursesData = [
  {
    id: 1,
    tag: "Understanding",
    title: "Sustainable Business Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna. Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur",
    duration: "4 Weeks",
    hours: 12,
    courseNumber: "01",
  },
  {
    id: 2,
    tag: "Understanding",
    title: "Sustainable Business Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna. Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur",
    duration: "4 Weeks",
    hours: 12,
    courseNumber: "02",
  },
  {
    id: 3,
    tag: "Understanding",
    title: "Sustainable Business Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna. Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur",
    duration: "4 Weeks",
    hours: 12,
    courseNumber: "03",
  },
  {
    id: 4,
    tag: "Understanding",
    title: "Sustainable Business Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna. Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur",
    duration: "4 Weeks",
    hours: 12,
    courseNumber: "04",
  },
  {
    id: 5,
    tag: "Understanding",
    title: "Sustainable Business Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna. Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur",
    duration: "4 Weeks",
    hours: 12,
    courseNumber: "05",
  },
  {
    id: 6,
    tag: "Understanding",
    title: "Sustainable Business Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ut eget arcu integer dolor magna. Lorem ipsum dolor sit amet consectetur dolor sit amet consectetur",
    duration: "4 Weeks",
    hours: 12,
    courseNumber: "06",
  },
];

// Course Card Component
const CourseCard = ({
  tag,
  title,
  description,
  duration,
  hours,
  courseNumber,
  isLast = false,
}: {
  tag: string;
  title: string;
  description: string;
  duration: string;
  hours: number;
  courseNumber: string;
  isLast?: boolean;
}) => {
  return (
    <Box sx={{ position: "relative", mb: 2 }}>
      <Box
        sx={{
          position: "absolute",
          top: -15,
          left: "70%",
          transform: "translateX(-50%)",
          zIndex: 2,
          px: 2,
          py: 0.5,
          bgcolor: "#F8B75D",
          borderRadius: 5,
          color: "#000",
          fontWeight: 500,
        }}
      >
        Course-{courseNumber}
      </Box>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Chip
          label={tag}
          sx={{
            bgcolor: "#E8F4F6",
            color: "#555",
            fontWeight: 500,
            mb: 2,
            alignSelf: "flex-start",
          }}
        />

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, flex: 1 }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "auto",
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Duration: {duration}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "#E8F4F6",
                  mr: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  color: "#1A3A40",
                }}
              >
                ⏱️
              </Box>
              <Typography variant="body2" color="text.secondary">
                {hours} hours
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            sx={{
              borderRadius: 5,
              borderColor: isLast ? "#1E383C" : "#E7EAE9",
              color: isLast ? "white" : "#1E383C",
              bgcolor: isLast ? "#1E383C" : "transparent",
              "&:hover": {
                bgcolor: isLast ? "#162A2E" : "rgba(0,0,0,0.04)",
                borderColor: isLast ? "#162A2E" : "#c5c5c5",
              },
            }}
          >
            Start Learning
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default function StartLearningPage() {
  const [scheduleType, setScheduleType] = useState<string>("module");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
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
        sx={{
          p: 3,
          borderRadius: 2,
          mb: 4,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={() => {
              setScheduleType("module");
              setDrawerOpen(true);
            }}
            variant={scheduleType === "module" ? "contained" : "outlined"}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: scheduleType === "module" ? "#1E383C" : "transparent",
              color: scheduleType === "module" ? "white" : "#1E383C",
              borderColor: "#1E383C",
              "&:hover": {
                bgcolor:
                  scheduleType === "module"
                    ? "#162A2E"
                    : "rgba(30, 56, 60, 0.04)",
                borderColor: "#1E383C",
              },
              textTransform: "none",
            }}
            startIcon={<CalendarMonthOutlinedIcon />}
          >
            Module Scheduling
          </Button>
          <Button
            onClick={() => setScheduleType("course")}
            variant={scheduleType === "course" ? "contained" : "outlined"}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: scheduleType === "course" ? "#E8F4F6" : "transparent",
              color: "#1E383C",
              borderColor: "#1E383C",
              "&:hover": {
                bgcolor:
                  scheduleType === "course"
                    ? "#D2E8EC"
                    : "rgba(30, 56, 60, 0.04)",
                borderColor: "#1E383C",
              },
              textTransform: "none",
            }}
            startIcon={<CalendarMonthOutlinedIcon />}
          >
            Course Scheduling
          </Button>
        </Box>
      </Paper>

      <Grid2 container spacing={3}>
        {coursesData.map((course, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
            <CourseCard
              tag={course.tag}
              title={course.title}
              description={course.description}
              duration={course.duration}
              hours={course.hours}
              courseNumber={course.courseNumber}
              isLast={index === 5}
            />
          </Grid2>
        ))}
      </Grid2>

      <Box
        sx={{
          display: "flex",
          mt: 2,
          border: "1px solid #E7EAE9",
          borderRadius: 2,
          bgcolor: "#FFFFFF",
          p: 1,
        }}
      >
        <Button
          variant="contained"
          size="small"
          component={Link}
          href="/pathway/learning-pathway"
          sx={{
            bgcolor: "#1E383C",
            color: "white",
            borderRadius: 6,
            px: 4,
            py: 1.5,
            "&:hover": {
              bgcolor: "#162A2E",
            },
          }}
        >
          Click to see your Learning Pathway
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ width: 800, flexShrink: 0, "& .MuiDrawer-paper": { width: 800 } }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Schedule Your Course
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Today Schedule
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "#f0f0f0",
                  borderRadius: 1,
                }}
              />
              <Box>
                <Typography variant="body2">
                  Sustainable Business Practices
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  09:00 AM | Web Design
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Tomorrow Schedule
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "#f0f0f0",
                  borderRadius: 1,
                }}
              />
              <Box>
                <Typography variant="body2">
                  Sustainable Business Practices
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  09:00 AM | Web Design
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Select Date and Time
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <IconButton>
                <CalendarMonthOutlinedIcon />
              </IconButton>
              <Typography variant="body2">April 2024</Typography>
              <IconButton>
                <CalendarMonthOutlinedIcon />
              </IconButton>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <Typography key={day} variant="caption" color="text.secondary">
                  {day}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              {[24, 25, 26, 27, 28, 29, 30].map((date) => (
                <Button key={date} variant="outlined" size="small">
                  {date}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {["10 Min", "20 Min", "30 Min", "40 Min", "50 Min", "1 Hour"].map(
                (time) => (
                  <Button key={time} variant="outlined" size="small">
                    {time}
                  </Button>
                )
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Select Course
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              defaultValue="Sustainable Business Practices"
              SelectProps={{
                native: true,
              }}
            >
              <option value="Sustainable Business Practices">
                Sustainable Business Practices
              </option>
            </TextField>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Select Module
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              defaultValue="Module-04"
              SelectProps={{
                native: true,
              }}
            >
              <option value="Module-04">Module-04</option>
            </TextField>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Set Your Goal
            </Typography>
            <ToggleButtonGroup
              value="course"
              exclusive
              size="small"
              sx={{ mb: 2 }}
            >
              <ToggleButton value="course">Course</ToggleButton>
              <ToggleButton value="module">Module</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              defaultValue="Sustainable Business Practices"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Start Date"
                type="date"
                fullWidth
              />
              <TextField
                variant="outlined"
                size="small"
                placeholder="End Date"
                type="date"
                fullWidth
              />
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Notification
            </Typography>
            <ToggleButtonGroup value="email" exclusive size="small">
              <ToggleButton value="email">Email</ToggleButton>
              <ToggleButton value="sms">SMS</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Set Reminder
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              defaultValue="01 hour before time"
              SelectProps={{
                native: true,
              }}
            >
              <option value="01 hour before time">01 hour before time</option>
            </TextField>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#1E383C",
              color: "white",
              borderRadius: 6,
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: "#162A2E",
              },
            }}
          >
            Save Schedule
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
