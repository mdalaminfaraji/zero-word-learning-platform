"use client";
import { useSearchParams } from "next/navigation";

import { useAssessmentStore } from "@/store/benchMark";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  Chip,
  Checkbox,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function AssessmentPage() {
  const {
    currentQuestion,
    answers,
    setAnswer,
    moveToNextQuestion,
    moveToPreviousQuestion,
    completePhase,
    getQuiz,
    currentQuiz,
    loading,
    dialogOpen,
    setDialogOpen,
    userProgressData,
    fetchUserProgress,
    handleFinishPhase,
  } = useAssessmentStore();
  const [userId, setUserId] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const question = currentQuiz[currentQuestion];
  const searchParams = useSearchParams();
  const phase = searchParams.get("phase") || "Understanding";

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
  const { Understanding, Developing, Performing, Leading } =
    userProgressData?.userProgress || {};
  useEffect(() => {
    getQuiz(phase);
  }, [getQuiz, phase]);

  useEffect(() => {
    // Load answers from localStorage on mount
    const storedAnswers = localStorage.getItem("userAnswers");
    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers);
      Object.keys(parsedAnswers).forEach((key) => {
        setAnswer(key, parsedAnswers[key]);
      });
    }
  }, [setAnswer]);

  useEffect(() => {
    // Save answers to localStorage whenever they change
    localStorage.setItem("userAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) => {
    const currentAnswers = answers[question.documentId] || [];
    const updatedAnswers =
      question.quizeType === "multipleAnswer"
        ? event.target.checked
          ? [...currentAnswers, option]
          : currentAnswers.filter((ans: string) => ans !== option)
        : [option];
    setAnswer(question.documentId, updatedAnswers);
  };

  const handleNextClick = () => {
    if (currentQuestion === currentQuiz.length - 1) {
      console.log("answer", answers);
    } else {
      moveToNextQuestion();
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: "16px" }}>
        <Skeleton variant="rectangular" width="100%" height={118} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
      </Box>
    );
  }

  return (
    <>
      {loading ? (
        <Box sx={{ padding: "16px" }}>
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
        </Box>
      ) : (
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: isSmallScreen ? "8px" : "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                maxWidth: "100%",
                justifyContent: isSmallScreen ? "center" : "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {[
                { name: "Understanding", isEnabled: Understanding || true },
                { name: "Developing", isEnabled: Developing || false },
                { name: "Performing", isEnabled: Performing || false },
                { name: "Leading", isEnabled: Leading || false },
              ].map((phaseItem, index) => {
                const isActive = phaseItem.name === phase;
                const isEnabled = phaseItem.isEnabled;

                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      backgroundColor: isActive
                        ? "#f4a261"
                        : isEnabled
                        ? "#fef4e9"
                        : "#F7DBB6",
                      color: isActive
                        ? "#fff"
                        : isEnabled
                        ? "#f4a261"
                        : "#9e9e9e",
                      fontWeight: isActive ? "bold" : "normal",
                      position: "relative",
                      minWidth: isSmallScreen ? "auto" : "180px",
                      textAlign: "center",
                      opacity: isEnabled ? 1 : 0.7,
                      cursor: isEnabled ? "default" : "not-allowed",
                      flexShrink: 0,
                      width: isSmallScreen ? "100%" : "auto",
                    }}
                  >
                    <Typography variant="body1">{phaseItem.name}</Typography>

                    {isEnabled && (
                      <Box
                        sx={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: isActive ? "#fff" : "#f4a261",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: isActive ? "none" : "2px solid #f4a261",
                        }}
                      >
                        <CheckIcon
                          sx={{
                            fontSize: "16px",
                            color: isActive ? "#f4a261" : "#fff",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 3,
              borderRadius: "10px",
              border: "1px solid #E7EAE9",
              backgroundColor: "#FAFAFA",
            }}
          >
            <Typography variant="h6" gutterBottom>
              <Box sx={{ width: "100%", paddingY: "20px" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Your Assessment
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px", // Space between step segments
                  }}
                >
                  {Array.from({ length: currentQuiz?.length }).map(
                    (_, index) => (
                      <Box
                        key={index}
                        sx={{
                          flex: 1, // Each step takes equal space
                          height: "8px",
                          borderRadius: "4px",
                          backgroundColor:
                            index < currentQuestion + 1
                              ? "#f4a261" // Orange for completed steps
                              : "#e0e0e0", // Light gray for unfinished steps
                        }}
                      />
                    )
                  )}
                </Box>
                {/* Steps Indicator */}
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    marginTop: "8px",
                    textAlign: "right",
                    color: "#888888",
                    fontWeight: "bold",
                  }}
                >
                  Step {String(currentQuestion + 1).padStart(2, "0")}/
                  {String(currentQuiz.length).padStart(2, "0")}
                </Typography>
              </Box>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip
                label={`${currentQuestion + 1}`}
                sx={{ mr: 1, fontWeight: 500, fontSize: "20px" }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, fontSize: "20px" }}
              >
                {" "}
                {question?.title}
              </Typography>
            </Box>
            {question?.quizeType === "singleAnswer" ? (
              <RadioGroup
                value={answers[question?.documentId]?.[0] || ""}
                onChange={(e) => handleAnswerChange(e, e.target.value)}
                sx={{ mt: 2 }}
              >
                <Grid container spacing={2}>
                  {question?.options.map((option, index) => (
                    <Grid size={6} key={index}>
                      <FormControlLabel
                        value={option}
                        control={<Radio />}
                        label={`(${String.fromCharCode(65 + index)}) ` + option}
                        sx={{
                          borderRadius: 10,
                          pl: 1,
                          pr: 2,
                          backgroundColor: "#F2F2F2",
                          "&:hover": { backgroundColor: "action.hover" },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            ) : (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {question?.options.map((option, index) => (
                  <Grid size={6} key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            answers[question.documentId]?.includes(option) ||
                            false
                          }
                          onChange={(e) => handleAnswerChange(e, option)}
                        />
                      }
                      label={`(${String.fromCharCode(65 + index)}) ` + option}
                      sx={{
                        mb: 1,
                        borderRadius: 1,
                        padding: 1,
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            <Box
              sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                disabled={currentQuestion === 0}
                onClick={moveToPreviousQuestion}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={
                  currentQuestion === currentQuiz.length - 1
                    ? () => handleFinishPhase(userId)
                    : handleNextClick
                }
              >
                {currentQuestion === currentQuiz.length - 1
                  ? `Finish ${phase} Stage`
                  : "Next"}
              </Button>
            </Box>
          </Box>

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            PaperProps={{
              sx: {
                borderRadius: "16px",
                minWidth: isSmallScreen ? "90%" : "500px",
                padding: "16px",
              },
            }}
          >
            <DialogTitle
              sx={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#2C3E50",
                pb: 1,
              }}
            >
              Phase Completed!
            </DialogTitle>
            <Box sx={{ px: 3, pb: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#34495E", textAlign: "center" }}
              >
                Congratulations on completing the {phase} phase!
              </Typography>
              <Typography sx={{ color: "#7F8C8D", mb: 3, textAlign: "center" }}>
                You have successfully completed all questions in this phase.
                Would you like to proceed to the next phase of your assessment?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => setDialogOpen(false)}
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    px: 3,
                    borderColor: "#BDC3C7",
                    color: "#7F8C8D",
                    "&:hover": {
                      borderColor: "#95A5A6",
                      backgroundColor: "#F8F9F9",
                    },
                  }}
                >
                  Review Answers
                </Button>
                <Button
                  onClick={() => completePhase(phase)}
                  variant="contained"
                  sx={{
                    borderRadius: "8px",
                    px: 3,
                    backgroundColor: "#f4a261",
                    "&:hover": {
                      backgroundColor: "#e76f51",
                    },
                  }}
                >
                  Continue to Next Phase
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Box>
      )}
    </>
  );
}
