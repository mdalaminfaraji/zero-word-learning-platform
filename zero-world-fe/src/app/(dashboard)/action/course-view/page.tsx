"use client";
import React from "react";

import {
  Box,
  Breadcrumbs,
  Chip,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Popover,
  TextField,
} from "@mui/material";
import Link from "next/link";
import VideoPlayer from "@/components/action/VideoPlayer";
import CourseModules from "@/components/action/CourseModules";
import ActionPlanner from "@/components/action/ActionPlanner";
import NoteTaking from "@/components/action/NoteTaking";
import AssignmentSubmissionModal from "@/components/action/AssignmentSubmissionModal";
import ShareIcon from "@mui/icons-material/Share";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Image from "next/image";

// Define module type here to avoid circular dependencies
interface Module {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed?: boolean;
  pathway?: string;
  course?: string;
}

// Sample module data with video URLs
const modules: Module[] = [
  {
    id: 1,
    title: "Module -01: Sustainable Business Practices",
    duration: "2 hr 30 mins",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    completed: true,
    pathway: "Pathway 1.2",
    course: "Course-01",
  },
  {
    id: 2,
    title: "Module -02: Sustainable Business Practices",
    duration: "2 hr 30 mins",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    completed: false,
    pathway: "Pathway 1.3",
    course: "Course-01",
  },
  {
    id: 3,
    title: "Module -03: Sustainable Business Practices",
    duration: "2 hr 30 mins",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    completed: false,
    pathway: "Pathway 1.4",
    course: "Course-02",
  },
  {
    id: 4,
    title: "Module -04: Sustainable Business Practices",
    duration: "2 hr 30 mins",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    completed: false,
    pathway: "Pathway 1.5",
    course: "Course-02",
  },
  {
    id: 5,
    title: "Module -05: Sustainable Business Practices",
    duration: "2 hr 30 mins",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    completed: false,
    pathway: "Pathway 1.6",
    course: "Course-03",
  },
];

// Sample discussion data
const discussions = [
  {
    id: 1,
    author: "Md. Mosabberuzzaman Ovi",
    avatar: "/avatar1.jpg",
    date: "Sep 9, 2024",
    time: "03:10 AM",
    content: "Facebook Group: Link",
  },
  {
    id: 2,
    author: "Md. Mosabberuzzaman Ovi",
    avatar: "/avatar2.jpg",
    date: "Sep 9, 2024",
    time: "03:10 AM",
    content: "Facebook Group: Link",
  },
  {
    id: 3,
    author: "Md. Mosabberuzzaman Ovi",
    avatar: "/avatar3.jpg",
    date: "Sep 9, 2024",
    time: "03:10 AM",
    content: "Facebook Group: Link",
  },
];

export default function CourseViewPage() {
  const [activeModule, setActiveModule] = React.useState(modules[0]);
  const [activeTab, setActiveTab] = React.useState(0);
  const [tagsAnchorEl, setTagsAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [noteModalOpen, setNoteModalOpen] = React.useState(false);
  const [questionText, setQuestionText] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [submissionModalOpen, setSubmissionModalOpen] = React.useState(false);
  const [fileSubmitted, setFileSubmitted] = React.useState(false);

  // Tags popup state
  const tagsPopupOpen = Boolean(tagsAnchorEl);
  const tagsPopupId = tagsPopupOpen ? "tags-popover" : undefined;

  // Handle module selection
  const handleModuleSelect = (module: Module) => {
    setActiveModule(module);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle file upload and submission
  const handleSubmitAssignment = () => {
    if (selectedFile) {
      console.log("Assignment submitted:", selectedFile.name);
      setFileSubmitted(true);
      // In a real app, this would upload the file to a server
      // For demo purposes, we'll just mark it as submitted
    } else {
      alert("Please select a file first");
    }
  };

  // Handle next module button click
  // const handleNextModule = () => {
  //   // Check if assignment is submitted for the current module
  //   if (!fileSubmitted) {
  //     setSubmissionModalOpen(true);
  //     return;
  //   }

  //   // Logic to navigate to next module
  //   const currentIndex = modules.findIndex((m) => m.id === activeModule.id);
  //   if (currentIndex < modules.length - 1) {
  //     setActiveModule(modules[currentIndex + 1]);
  //   }
  // };

  // Handle opening the tags popup
  const handleTagsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTagsAnchorEl(event.currentTarget);
  };

  // Handle closing the tags popup
  const handleTagsClose = () => {
    setTagsAnchorEl(null);
  };

  // Handle navigation to previous/next module
  const navigateModule = (direction: "prev" | "next") => {
    const currentIndex = modules.findIndex((m) => m.id === activeModule.id);

    // For previous navigation
    if (direction === "prev" && currentIndex > 0) {
      setActiveModule(modules[currentIndex - 1]);
      return;
    }

    // For next navigation
    if (direction === "next") {
      // Check if in assignment tab and if assignment is submitted
      if (activeTab === 3 && !fileSubmitted) {
        // Show modal prompting to submit assignment first
        setSubmissionModalOpen(true);
        return;
      }

      // Navigate to next module if available
      if (currentIndex < modules.length - 1) {
        setActiveModule(modules[currentIndex + 1]);
      }
    }
  };

  return (
    <Box>
      {/* Breadcrumbs */}
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
            Action
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { md: "2fr 1fr" },
          border: "1px solid #E7EAE9",
          borderRadius: 2,
          p: 2,
        }}
      >
        {/* Left Column */}
        <Box>
          <VideoPlayer url={activeModule.videoUrl} />

          {/* Author and Navigation Section */}
          <Box
            sx={{
              mt: 2,
              mb: 3,
              p: 2,
              border: "1px solid #E7EAE9",
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#F1F2F4",
            }}
          >
            {/* Author Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                Author:{" "}
              </Typography>
              <Typography color="secondary" fontWeight="medium">
                Md. Karim
              </Typography>
            </Box>

            {/* Navigation Controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: { xs: "none", xl: "flex" },
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Image
                  src="/images/poverty.png"
                  alt="Poverty"
                  width={40}
                  height={40}
                />
                <Image
                  src="/images/zero-hunger.png"
                  alt="Zero Hunger"
                  width={40}
                  height={40}
                />
                <Image
                  src="/images/climate-action.png"
                  alt="Climate Action"
                  width={40}
                  height={40}
                />
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleTagsClick}
                  size="small"
                  endIcon={
                    <NavigateNextIcon
                      sx={{ transform: "rotate(90deg)", fontSize: "1rem" }}
                    />
                  }
                  sx={{
                    borderRadius: 20,
                    mr: 1,
                    px: 2,
                    py: 0.5,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                  aria-describedby={tagsPopupId}
                >
                  Show Tags
                </Button>

                {/* Tags Popup */}
                <Popover
                  id={tagsPopupId}
                  open={tagsPopupOpen}
                  anchorEl={tagsAnchorEl}
                  onClose={handleTagsClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    mt: 1,
                    "& .MuiPopover-paper": {
                      borderRadius: 10,
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      p: 1.5,
                      maxWidth: 250,
                      bgcolor: "#FFFFFF",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                    }}
                  >
                    <Box>
                      <Chip
                        label="Energy"
                        clickable
                        sx={{
                          borderRadius: 20,
                          bgcolor: "#f5f5f5",
                          color: "text.primary",
                          border: "none",
                          px: 2,
                          py: 1.2,
                          mb: 1,
                          height: "auto",
                          width: "100%",
                          justifyContent: "flex-start",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "#eeeeee",
                          },
                        }}
                      />
                      <Chip
                        label="Water"
                        clickable
                        sx={{
                          borderRadius: 20,
                          bgcolor: "#f5f5f5",
                          color: "text.primary",
                          border: "none",
                          px: 2,
                          py: 1.2,
                          mb: 1,
                          height: "auto",
                          width: "100%",
                          justifyContent: "flex-start",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "#eeeeee",
                          },
                        }}
                      />
                      <Chip
                        label="Climate"
                        clickable
                        sx={{
                          borderRadius: 20,
                          bgcolor: "#f5f5f5",
                          color: "text.primary",
                          border: "none",
                          px: 2,
                          py: 1.2,
                          mb: 1,
                          height: "auto",
                          width: "100%",
                          justifyContent: "flex-start",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "#eeeeee",
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Chip
                        label="Waste"
                        clickable
                        sx={{
                          borderRadius: 20,
                          bgcolor: "#f5f5f5",
                          color: "text.primary",
                          border: "none",
                          px: 2,
                          py: 1.2,
                          mb: 1,
                          height: "auto",
                          width: "100%",
                          justifyContent: "flex-start",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "#eeeeee",
                          },
                        }}
                      />
                      <Chip
                        label="Biodiversity"
                        clickable
                        sx={{
                          borderRadius: 20,
                          bgcolor: "#f5f5f5",
                          color: "text.primary",
                          border: "none",
                          px: 2,
                          py: 1.2,
                          mb: 1,
                          height: "auto",
                          width: "100%",
                          justifyContent: "flex-start",
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "#eeeeee",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Popover>
                <Button
                  variant="outlined"
                  startIcon={<NavigateBeforeIcon />}
                  onClick={() => navigateModule("prev")}
                  disabled={activeModule.id === 1}
                  sx={{ borderRadius: 4, mr: 1 }}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  endIcon={<NavigateNextIcon />}
                  onClick={() => navigateModule("next")}
                  disabled={activeModule.id === modules.length}
                  sx={{ borderRadius: 4 }}
                >
                  Next
                </Button>
              </Box>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <ShareIcon fontSize="small" />
                <span>4.5k</span>
              </Typography>
            </Box>
          </Box>

          {/* Module Title and Tags */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {activeModule.title}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}
              >
                <Box
                  sx={{
                    bgcolor: "#f5f5f5",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                  }}
                >
                  {activeModule.pathway}
                </Box>
                <Box
                  sx={{
                    bgcolor: "#FFA726",
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                  }}
                >
                  {activeModule.course}
                </Box>
              </Box>
            </Box>

            {/* Selected Tags Display */}
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label="Energy"
                  size="small"
                  sx={{
                    bgcolor: "#E53935",
                    color: "white",
                    borderRadius: 1,
                  }}
                />
                <Chip
                  label="Water"
                  size="small"
                  sx={{
                    bgcolor: "#1E88E5",
                    color: "white",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>

            {/* Module Details */}
          </Box>

          {/* Module Description */}
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </Typography>

          {/* Tabs Section */}
          <Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="module tabs"
            >
              <Tab label="Note-taking" />
              <Tab label="Q&A" />
              <Tab label="Resource" />
              <Tab label="Assignment" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ mb: 4 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="body1" color="text.secondary">
                  Add your notes about this module here...
                </Typography>
              </Box>
            )}

            {activeTab === 1 && (
              <Box sx={{ p: 2, border: "2px solid #E7EAE9", borderRadius: 4 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Type your question here..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  variant="standard"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      p: 1,
                      border: "1px solid #E7EAE9",
                      borderRadius: 4,
                      bgcolor: "#f9f9f9",
                    },
                  }}
                />
                <Box
                  sx={{
                    textAlign: "right",
                    mt: 1,
                    px: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 2, mb: 1 }}
                  >
                    {questionText.length}/1000
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#203A43",
                      color: "white",
                      borderRadius: 50,
                      textTransform: "none",
                      px: 4,
                      py: 1,
                      fontWeight: 500,
                      "&:hover": {
                        bgcolor: "#152a31",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Discussion
                </Typography>
                {discussions.map((discussion) => (
                  <Box
                    key={discussion.id}
                    sx={{ display: "flex", gap: 2, mb: 2 }}
                  >
                    <Avatar>M</Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {discussion.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {discussion.date} | {discussion.time}
                      </Typography>
                      <Typography variant="body2">
                        {discussion.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {/* Assignment Tab */}
            {activeTab === 3 && (
              <Box sx={{ p: 2, border: "2px solid #E7EAE9", borderRadius: 4 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Sustainable Business Practices
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mb: 3,
                  }}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      textTransform: "none",
                      borderColor: "#E0E0E0",
                      color: "#555",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    Choose File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>

                  <Box sx={{ width: "100%", mb: 2, fontSize: 14 }}>
                    <Typography variant="body2" component="span">
                      File Support: Document, Presentation, Sheet, PDF or Text
                      file
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ mt: 0.5 }}
                    >
                      Total File Size: Max 2 MB
                    </Typography>
                    {selectedFile && (
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ mt: 0.5, fontWeight: 500 }}
                      >
                        Selected: {selectedFile.name}
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleSubmitAssignment}
                      disabled={!selectedFile}
                      sx={{
                        bgcolor: "#203A43",
                        color: "white",
                        borderRadius: 50,
                        textTransform: "none",
                        px: 4,
                        py: 1,
                        fontWeight: 500,
                        "&:hover": {
                          bgcolor: "#152a31",
                        },
                        "&.Mui-disabled": {
                          bgcolor: "#e0e0e0",
                          color: "#a0a0a0",
                        },
                      }}
                    >
                      Submit Assignment
                    </Button>
                  </Box>
                </Box>

                {fileSubmitted && (
                  <Box
                    sx={{ mt: 2, p: 2, bgcolor: "#e8f5e9", borderRadius: 2 }}
                  >
                    <Typography variant="body1" color="#2e7d32">
                      Assignment submitted successfully!
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {/* Right Column */}
        <Box>
          <CourseModules
            modules={modules}
            onSelectModule={handleModuleSelect}
            activeModuleId={activeModule.id}
          />
          <Box
            sx={{
              border: "1px solid #E7EAE9",
              borderRadius: 2,
              p: 2,
              mt: 2,
              textAlign: "right",
              bgcolor: "#F1F2F4",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setNoteModalOpen(true)}
              sx={{
                bgcolor: "#E7F2F5",
                color: "#203A43",
                borderRadius: 50,
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#d0e6eb",
                },
              }}
            >
              Add Note
            </Button>
          </Box>
          <ActionPlanner />
        </Box>
      </Box>

      {/* Note Taking Modal */}
      <NoteTaking
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
      />

      {/* Assignment Submission Requirement Modal */}
      <AssignmentSubmissionModal
        open={submissionModalOpen}
        onClose={() => setSubmissionModalOpen(false)}
      />
    </Box>
  );
}
