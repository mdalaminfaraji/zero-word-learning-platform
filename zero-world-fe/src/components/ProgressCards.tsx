import { Box, Card, Typography, LinearProgress } from "@mui/material";
import { GiTrophyCup } from "react-icons/gi";
interface ProgressCardProps {
  title: string;
  count: number;
  score: number;
  color: string;
  icon: React.ReactNode;
  badgeLabel?: string;
}

export default function ProgressCard({
  title,
  score,
  color,
  icon,
  badgeLabel = "01",
}: ProgressCardProps) {
  return (
    <Card
      sx={{
        p: 2,
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 4,
            bgcolor: `${color}15`,
            color: color,
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          <GiTrophyCup /> {badgeLabel}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: `${color}15`,
            color: color,
            fontSize: "1.5rem",
          }}
        >
          {icon}
        </Box>
        <Box sx={{ width: "50%" }}>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Score
            </Typography>
            <Typography
              variant="caption"
              color="black"
              sx={{ fontWeight: "bold", ml: 1 }}
            >
              {score}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={score}
            sx={{
              height: 4,

              borderRadius: 3,
              bgcolor: `${color}15`,
              "& .MuiLinearProgress-bar": {
                bgcolor: color,
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </Box>
    </Card>
  );
}
