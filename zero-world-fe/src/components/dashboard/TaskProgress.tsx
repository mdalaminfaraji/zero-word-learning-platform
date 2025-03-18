import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

type Task = {
  name: string;
  progress: number;
  color: string;
};

const tasks: Task[] = [
  { name: "Lorem Ipsum", progress: 85, color: "#1e88e5" },
  { name: "Lorem Ipsum", progress: 85, color: "#f57c00" },
  { name: "Lorem Ipsum", progress: 85, color: "#43a047" },
];

const TaskProgressCard: React.FC = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "white",
      }}
    >
      {/* Title */}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ mb: 1, borderBottom: "1px solid #e0e0e0", pl: 2, py: 1 }}
      >
        Task Progress
      </Typography>

      {/* Task List */}
      <Box sx={{ px: 2, py: 1 }}>
        {tasks.map((task, index) => (
          <Box key={index} mb={1}>
            {/* Task Name and Progress */}
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="caption" fontWeight="bold">
                {task.name}
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {task.progress}%
              </Typography>
            </Box>
            {/* Progress Bar */}
            <LinearProgress
              variant="determinate"
              value={task.progress}
              sx={{
                height: 4,
                borderRadius: 4,
                backgroundColor: "#f0f0f0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: task.color,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskProgressCard;
