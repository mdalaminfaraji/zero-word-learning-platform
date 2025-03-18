import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PathwayStep from "./PathwayStep";

interface PathwayDetailProps {
  title: string;
  progress: number;
}

const PathwayDetail: React.FC<PathwayDetailProps> = ({ title, progress }) => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        border: "1px solid #E7EAE9",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" fontWeight={500}>
          {title}
        </Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
        <PathwayStep
          number="01"
          active={progress >= 1}
          completed={progress > 1}
        />
        <Box
          sx={{
            flex: 1,
            height: 2,
            bgcolor: progress > 1 ? "#0ECB81" : "#E7EAE9",
          }}
        />

        <PathwayStep
          number="02"
          active={progress >= 2}
          completed={progress > 2}
        />
        <Box
          sx={{
            flex: 1,
            height: 2,
            bgcolor: progress > 2 ? "#0ECB81" : "#E7EAE9",
          }}
        />

        <PathwayStep
          number="03"
          active={progress >= 3}
          completed={progress > 3}
        />
        <Box
          sx={{
            flex: 1,
            height: 2,
            bgcolor: progress > 3 ? "#0ECB81" : "#E7EAE9",
          }}
        />

        <PathwayStep
          number="04"
          active={progress >= 4}
          completed={progress > 4}
        />
        <Box
          sx={{
            flex: 1,
            height: 2,
            bgcolor: progress > 4 ? "#0ECB81" : "#E7EAE9",
          }}
        />

        <PathwayStep
          number="05"
          active={progress >= 5}
          completed={progress > 5}
        />
        <Box
          sx={{
            flex: 1,
            height: 2,
            bgcolor: progress > 5 ? "#0ECB81" : "#E7EAE9",
          }}
        />

        <PathwayStep
          number="06"
          active={progress >= 6}
          completed={progress > 6}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Course Completion:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 6,
              bgcolor: "#E7EAE9",
              borderRadius: 1,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${progress * 16.66}%`,
                bgcolor: "#0ECB81",
                borderRadius: 1,
              }}
            />
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {Math.round(progress * 16.66)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PathwayDetail;
