"use client";
import React from "react";
import { Typography, Box, Grid2, Breadcrumbs } from "@mui/material";

import PerformanceAnalysis from "@/components/analysis/PerformanceAnalysis";
import ActivityHours from "@/components/analysis/ActivityHours";
import YourActivity from "@/components/analysis/YourActivity";
import PerformanceOnLearning from "@/components/analysis/PerformanceOnLearning";
import Link from "next/link";

export default function AnalysisPage() {
  return (
    <Box>
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
            Analysis
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <PerformanceAnalysis />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <ActivityHours />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <YourActivity />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <PerformanceOnLearning />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Box
            sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 3, mt: 2 }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Sustainability Skills Maturity Score
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  Obtain Score 12
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Score 15
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  height: 10,
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    bgcolor: "#f0f0f0",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: "80%",
                    height: "100%",
                    bgcolor: "#F9A825",
                    borderRadius: 5,
                  }}
                />
              </Box>
            </Box>

            <Typography variant="subtitle1" fontWeight="medium" mb={1}>
              Understanding
            </Typography>

            {/* Additional categories - you can add more if needed */}
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                color="text.secondary"
              >
                Developing
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                color="text.secondary"
              >
                Not Started
              </Typography>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
