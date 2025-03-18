import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Menu,
  LinearProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

interface RecommendedCourseProps {
  title: string;
  instructor: string;
  modules: number;
  quiz: number;
  duration: string;
  progress?: number;
  tags: string[];
  imageSrc: string;
}

const RecommendedCourse: React.FC<RecommendedCourseProps> = ({
  title,
  instructor,
  modules,
  quiz,
  duration,
  progress,
  tags,
  imageSrc,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        bgcolor: "white",
        borderRadius: 2,
        border: "1px solid #E7EAE9",
        mb: 2,
      }}
    >
      <Box
        sx={{
          mr: 2,
          width: 110,
          height: 130,
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "1rem", fontWeight: 600 }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E7EAE9",
            pb: 1,
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            By <span style={{ color: "#ECA548" }}>{instructor}</span>
          </Typography>
          <Box>
            <Button
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                fontSize: "0.75rem",
                color: "#1E383C",
                textTransform: "none",
                fontWeight: 500,
                border: "1px solid #e0e0e0",
                borderRadius: 1.5,
                padding: "4px 8px",
                minWidth: "auto",
              }}
            >
              Show Tags
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  width: 200,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: "#F5F5F5",
                      fontSize: "0.75rem",
                      height: 24,
                    }}
                  />
                ))}
              </Box>
            </Menu>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 1, color: "#535353" }}>
          <Typography variant="body2">{modules} Modules</Typography>
          <Typography variant="body2">
            <span style={{ color: "#1A3A40", marginRight: "2px" }}>•</span>
            {quiz} Quiz
          </Typography>
          <Typography variant="body2">
            <span style={{ color: "#1A3A40", marginRight: "2px" }}>•</span>
            {duration}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "#1E383C",
              fontWeight: 500,
              textTransform: "none",
              fontSize: "0.875rem",
              padding: "4px 4px",
              textAlign: "left",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
          >
            Add to Schedule
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {progress !== undefined && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "120px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    Progress
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
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
                      backgroundColor: "#1E383C",
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendedCourse;
