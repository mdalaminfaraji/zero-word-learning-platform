"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { AccessTime, CheckCircle } from "@mui/icons-material";

export interface Module {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed?: boolean;
}

interface CourseModulesProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
  activeModuleId?: number;
}

export default function CourseModules({
  modules,
  onSelectModule,
  activeModuleId = 1,
}: CourseModulesProps) {
  // Calculate total course duration
  const totalTime = "09:20:15";

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#1A3A40",
          color: "white",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Course Curriculum
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTime sx={{ fontSize: 18 }} />
          <Typography>{totalTime}</Typography>
        </Box>
      </Box>

      {/* Module List */}
      <List sx={{ p: 0, maxHeight: 400, overflowY: "auto" }}>
        {modules.map((module) => {
          const isActive = module.id === activeModuleId;
          
          return (
            <ListItem
              key={module.id}
              sx={{
                p: 0,
                borderBottom: "1px solid #E7EAE9",
                bgcolor: isActive ? "#f5f5f5" : "transparent",
                "&:hover": {
                  bgcolor: "#f8f8f8",
                },
              }}
              onClick={() => onSelectModule(module)}
            >
              <Box
                sx={{
                  width: "100%",
                  p: 2,
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography 
                    color={isActive ? "primary" : "textPrimary"}
                    fontWeight={isActive ? "medium" : "regular"}
                  >
                    {module.title}
                  </Typography>
                  {module.completed && (
                    <CheckCircle color="success" sx={{ fontSize: 18 }} />
                  )}
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#F59E0B",
                    }}
                  >
                    <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                    <Typography variant="body2" fontWeight="medium">
                      {module.duration}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
