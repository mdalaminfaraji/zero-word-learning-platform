"use client";

import { Box, Button } from "@mui/material";
import { useState } from "react";

interface TabNavigationProps {
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "enrolled Courses", label: "Enrolled" },
  { id: "essential Courses", label: "Essential" },
  { id: "recommended Courses", label: "Recomended" },
  { id: "completed Courses", label: "Completed" },
];

export default function TabNavigation({ onTabChange }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState("enrolled");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 1,
        "& button": {
          borderRadius: 4,
          textTransform: "none",
          px: 3,
          fontSize: "0.875rem",
          fontWeight: 500,
          minWidth: 120,
        },
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          size="small"
          onClick={() => handleTabClick(tab.id)}
          sx={{
            bgcolor: activeTab === tab.id ? "#1A3A40" : "#E5F0FF",
            color: activeTab === tab.id ? "white" : "#1A3A40",
            "&:hover": {
              bgcolor: activeTab === tab.id ? "#2C3A80" : "#D1E4FF",
            },
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
}
