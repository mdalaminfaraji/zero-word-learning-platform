import React from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

type CourseRowProps = {
  courseNumber: string;
  courseName: string;
  moduleName: string;
  userName: string;
  progress: number; // Progress in percentage
  rank: number; // Rank or position
};

const CourseRow: React.FC<CourseRowProps> = ({
  courseNumber,
  courseName,
  moduleName,
  userName,
  progress,
  rank,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 0.5,
        bgcolor: "white",
        borderRadius: 2,
        border: "1px solid #E7EAE9",
        "&:hover": {
          boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* Course Name */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" sx={{ fontWeight: 400, color: "#555" }}>
            Course {courseNumber}:
          </Box>{" "}
          {courseName}
        </Typography>

        {/* Module - Moved here to align with the design */}
        <Chip
          label={moduleName}
          sx={{
            bgcolor: "#E6F1FE",
            color: "#2c7be5",
            borderRadius: "25px",
            fontWeight: 500,
            height: 26,
            maxWidth: "fit-content",
          }}
          size="small"
        />
      </Box>

      {/* User Name */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: "#555",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box component="span" sx={{ color: "#777", mb: 0.5 }}>
            Name: {userName}
          </Box>
        </Typography>
      </Box>

      {/* Progress */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
        }}
      >
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={progress}
            size={44}
            thickness={4}
            sx={{
              color: "#2ad062",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "#333",
              }}
            >
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Rank */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
        }}
      >
        <Chip
          icon={
            <EmojiEventsOutlinedIcon
              style={{ fontSize: 16, color: "#f6bd16" }}
            />
          }
          label={String(rank).padStart(2, "0")}
          sx={{
            bgcolor: "#FFF9E7",
            color: "#333",
            fontWeight: 500,
            "& .MuiChip-label": {
              px: 1,
            },
          }}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default CourseRow;
