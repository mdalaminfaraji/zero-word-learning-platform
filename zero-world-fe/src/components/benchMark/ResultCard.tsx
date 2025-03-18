// components/ResultCard.js
"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
interface ResultCardProps {
  title: string;
  bgColor: string;
  progressColor: string;
  progressValue: number;
  resultText: string;
  score: number;
  maxScore: number;
  resultTextBgColor?: string;
  isTrue: boolean;
  answerCount: number;
  onClick: () => void;
}

const ResultCard = ({
  title,
  isTrue,
  bgColor,
  progressColor,
  progressValue,
  onClick,
  resultText,
  score,
  maxScore,
  resultTextBgColor,
  answerCount,
}: ResultCardProps) => {
  const percentageMarks =
    maxScore > 0 ? Number(((score / maxScore) * 100).toFixed(2)) : 0;
  console.log(progressValue);
  const passingThreshold = 80;
  const hasPassed = isTrue && percentageMarks >= passingThreshold;
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: isTrue ? "pointer" : "not-allowed",
        opacity: isTrue ? 1 : 0.6,
        backgroundColor: bgColor,
        borderRadius: 2,
        color: "text.primary",
        boxShadow: 3,
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box sx={{ width: "40%" }}>
            <Typography variant="body2">{percentageMarks}% Marks</Typography>
            <LinearProgress
              variant="determinate"
              value={percentageMarks}
              sx={{
                my: 1,
                height: 8,
                borderRadius: 5,
                backgroundColor: progressColor,
              }}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: resultTextBgColor,
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            {hasPassed
              ? "Passed"
              : isTrue && answerCount > 0
              ? "Failed"
              : resultText}
          </Box>
        </Box>

        {/* Result Text and Score */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: "1.1rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Score
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 0.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                bgcolor: "primary.main",
                borderRadius: 4,
                px: 2,
              }}
            >
              {score < 10 ? `0${score}` : score}
            </Typography>
            <Typography variant="body2">
              Out of {maxScore < 10 ? `0${maxScore}` : maxScore}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
