import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Stack,
} from "@mui/material";

const ProjectCard: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "white",
      }}
    >
      {/* Title */}
      <Typography variant="subtitle1" fontWeight="bold" mb={3}>
        Sustainable Business Practices
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="text.secondary" mb={3}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum is simply dummy. Lorem Ipsum is simply dummy text
        of the printing and typesetting industry.
      </Typography>

      {/* Learners and Mentors */}
      <Stack direction="row" spacing={3} alignItems="center" mb={3}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Learners
          </Typography>
          <AvatarGroup max={3}>
            <Avatar
              src="/path/to/image1.jpg"
              alt="Learner 1"
              sx={{ width: 40, height: 40 }}
            />
            <Avatar
              src="/path/to/image2.jpg"
              alt="Learner 2"
              sx={{ width: 40, height: 40 }}
            />
            <Avatar
              src="/path/to/image3.jpg"
              alt="Learner 3"
              sx={{ width: 40, height: 40 }}
            />
          </AvatarGroup>
        </Box>

        {/* Mentors */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Mentors
          </Typography>
          <AvatarGroup style={{ padding: "4px" }} max={2}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src="/path/to/mentor1.jpg"
              alt="Mentor 1"
            />
            <Avatar
              sx={{ width: 40, height: 40 }}
              src="/path/to/mentor2.jpg"
              alt="Mentor 2"
            />
          </AvatarGroup>
        </Box>
      </Stack>

      {/* Project Progress */}
      <Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Project Progress
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            72%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={72}
          sx={{
            height: 4,
            borderRadius: 4,
            backgroundColor: "#f0f0f0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#f57c00",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ProjectCard;
