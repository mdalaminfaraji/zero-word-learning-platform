"use client";
import React, { useState } from "react";

import { Box, Typography, Button, Breadcrumbs } from "@mui/material";
import ResultCard from "@/components/benchMark/ResultCard";
import Link from "next/link";
import { IoDocumentText } from "react-icons/io5";
import { useEffect } from "react";
import { useAssessmentStore } from "@/store/benchMark";
import { useRouter } from "next/navigation";

import { getCookie } from "cookies-next";
const BenchMarkPage = () => {
  const [assessmentPhase, setAssessmentPhase] = useState("Understanding");
  const router = useRouter();
  const { fetchUserProgress, userProgressData } = useAssessmentStore();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie as string);
        setUserId(userData.documentId);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserProgress(userId);
    }
  }, [fetchUserProgress, userId]);

  const {
    Understanding,
    Developing,
    Performing,
    Leading,
    UnderstandingScore,
    DevelopingScore,
    PerformingScore,
    LeadingScore,
    UnderstandingAnswerCount,
    DevelopingAnswerCount,
    PerformingAnswerCount,
    LeadingAnswerCount,
  } = userProgressData?.userProgress || {};

  console.log(userProgressData);

  const handleStartAssessment = () => {
    if (assessmentPhase) {
      router.push(`/benchmark/assessment?phase=${assessmentPhase}`);
    }
  };

  const handlePhaseSelect = (phase: string, isEnabled: boolean) => {
    if (phase === assessmentPhase && isEnabled) {
      return;
    }

    // If the clicked phase is enabled, set it as the new assessment phase
    if (isEnabled) {
      setAssessmentPhase(phase);
    }
  };

  const cardsData = [
    {
      title: "Understanding",
      onClick: () => handlePhaseSelect("Understanding", Understanding || true),
      isTrue: Understanding || false,
      bgColor: "#FFEB3B",
      resultTextBgColor: "#A4DAC3",
      progressValue: UnderstandingScore || 0,
      progressColor: "#FFFFFF",
      maxScore: 30,
      score: UnderstandingScore || 0,
      resultText: "Waiting for result",
      answerCount: UnderstandingAnswerCount || 0,
    },
    {
      title: "Developing",
      onClick: () => handlePhaseSelect("Developing", Developing || false),
      isTrue: Developing || false,
      bgColor: "#A4DAC3",
      resultTextBgColor: "#FFEB3B",
      progressValue: DevelopingScore || 0,
      progressColor: "#FFFFFF",
      maxScore: 30,
      score: DevelopingScore || 0,
      resultText: "Waiting for result",
      answerCount: DevelopingAnswerCount || 0,
    },
    {
      title: "Performing",
      onClick: () => handlePhaseSelect("Performing", Performing || false),
      isTrue: Performing || false,
      bgColor: "#EAC6D4",
      resultTextBgColor: "#9ABFF6",
      progressValue: PerformingScore || 0,
      progressColor: "#FFFFFF",
      maxScore: 30,
      score: PerformingScore || 0,
      resultText: "Waiting for result",
      answerCount: PerformingAnswerCount || 0,
    },
    {
      title: "Leading",
      onClick: () => handlePhaseSelect("Leading", Leading || false),
      isTrue: Leading || false,
      bgColor: "#9ABFF6",
      resultTextBgColor: "#EAC6D4",
      progressValue: LeadingScore || 0,
      progressColor: "#FFFFFF",
      maxScore: 30,
      score: LeadingScore || 0,
      resultText: "Waiting for result",
      answerCount: LeadingAnswerCount || 0,
    },
  ];

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="/"
          style={{ fontWeight: 500, fontSize: 18 }}
        >
          Home
        </Link>
        <Typography color="text.primary" variant="h6">
          Benchmark
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          p: 3,
          mx: "auto",
          bgcolor: "#F9F9FB",
          border: "2px solid #E7EAE9",
          borderRadius: 3,
          mt: 2,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
          Your Assessment Result
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {cardsData.map((data, index) => (
            <Box
              key={index}
              sx={{
                flex: "1 1 calc(25% - 16px)", // 4 cards on large screens
                maxWidth: "calc(25% - 16px)",
                "@media (max-width:1400px)": {
                  flex: "1 1 calc(50% - 16px)", // 2 cards on medium screens
                  maxWidth: "calc(50% - 16px)",
                },
                "@media (max-width:600px)": {
                  flex: "1 1 100%", // 1 card on small screens
                  maxWidth: "100%",
                },
              }}
            >
              <ResultCard {...data} />
            </Box>
          ))}
        </Box>

        {/* Description Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome to your Sustainability Skills Benchmark Assessment
          </Typography>
          <Typography sx={{ mt: 2, color: "#535353", fontSize: "1.1rem" }}>
            Complete the baseline assessment to build a personalised learning
            pathway and course. This assessment is designed to gauge your
            current knowledge and awareness of sustainability skills relevant to
            your industry and role. It consists of 24 multiple-choice questions,
            each crafted to address essential aspects of sustainable practices,
            environmental impacts, and eco-friendly innovation within your
            field. The assessment should take about 10-15 minutes to complete.
          </Typography>
          <Typography sx={{ mt: 2, color: "#535353", fontSize: "1.1rem" }}>
            The goal is not to achieve a perfect score but to establish a
            benchmark to measure your growth over time. Take your time with each
            question and answer as accurately as possible based on your current
            understanding. This will help identify areas of strength and
            potential improvement as you integrate sustainable practices into
            your professional journey.
          </Typography>
        </Box>

        {/* Selected Phase and Button Section */}
        <Box sx={{ mt: 4 }}>
          {assessmentPhase && (
            <Typography variant="h6" sx={{ mb: 2, color: "#535353" }}>
              Selected Phase: {assessmentPhase}
            </Typography>
          )}
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ borderRadius: 4 }}
            onClick={handleStartAssessment}
            disabled={!assessmentPhase}
          >
            Start Assessment <IoDocumentText style={{ marginLeft: "4px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BenchMarkPage;
