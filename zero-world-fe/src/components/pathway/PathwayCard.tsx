import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Popover,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface PathwayProps {
  status: "Understanding" | "Developing" | "Performing" | "Leading";
  number: number;
  title: string;
  essentialCourses: number;
  description: string;
  showDetails?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Understanding":
      return "#F8B75D";
    case "Developing":
      return "#52A1AD";
    case "Performing":
      return "#52A1AD";
    case "Leading":
      return "#52A1AD";
    default:
      return "#F8B75D";
  }
};

// Demo path data for the popup
const pathwaySkills = [
  {
    id: 1,
    title: "Introduction to Sustainable Business Practices",
    completed: true,
  },
  { id: 2, title: "Pathways 1.2: Foundational Skill", completed: false },
  { id: 3, title: "Pathways 1.3: Foundational Skill", completed: false },
  { id: 4, title: "Pathways 1.4: Foundational Skill", completed: false },
];

const PathwayCard: React.FC<PathwayProps> = ({
  status,
  number,
  title,
  essentialCourses,
  description,
  showDetails = false,
}) => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const popoverOpen = Boolean(popoverAnchorEl);

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Chip
          label={status}
          sx={{
            bgcolor: getStatusColor(status),
            color: status === "Understanding" ? "#000" : "#fff",
            fontWeight: 500,
            px: 1,
          }}
        />
        {showDetails && (
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
        )}
        <IconButton onClick={handleIconClick} size="small">
          <MoreVertIcon />
        </IconButton>

        <Popover
          open={popoverOpen}
          anchorEl={popoverAnchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              width: 350,
              p: 2,
              borderRadius: 2,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Pathway {number} Progress
            </Typography>

            {pathwaySkills.map((skill, index) => (
              <Box key={skill.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />}
                <Box sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={500}>
                      {skill.title}
                    </Typography>
                    {skill.completed && (
                      <CheckCircleOutlineIcon sx={{ color: "#0ECB81" }} />
                    )}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <React.Fragment key={step}>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            bgcolor:
                              step === 1 && skill.completed
                                ? "#0ECB81"
                                : step === 1
                                ? "#F8B75D"
                                : "#E7EAE9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: step === 1 ? "white" : "#555",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          {String(step).padStart(2, "0")}
                        </Box>
                        {step < 6 && (
                          <Box
                            sx={{
                              flex: 1,
                              height: 2,
                              bgcolor:
                                step === 1 && skill.completed
                                  ? "#0ECB81"
                                  : "#E7EAE9",
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Popover>
      </Box>

      {!showDetails && (
        <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
          Pathway {number}
        </Typography>
      )}

      <Box
        sx={{
          bgcolor: "#E8F4F6",
          borderRadius: 1,
          p: 1,
          mt: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" fontWeight={600}>
          Essential Courses : {String(essentialCourses).padStart(2, "0")}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>

      {!showDetails && (
        <Box sx={{ textAlign: "center", mt: "auto" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#1A3A40",
              cursor: "pointer",
              border: "1px solid #D2E8EC",
              borderRadius: 4,
              px: 1,
              py: 1,
              width: "180px",
              mx: "auto",
            }}
          >
            Click To View Plan
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PathwayCard;
