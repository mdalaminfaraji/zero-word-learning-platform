"use client";

import { useAssessmentStore } from "@/store/benchMark";
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Container,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import Assessment from "@/components/benchMark/Assessment";

export default function AssessmentPage() {
  const {
    phases,
    currentPhase,
    currentQuestion,
    answers,
    setAnswer,
    moveToNextQuestion,
    moveToPreviousQuestion,
    completePhase,
    getQuiz,
    currentQuiz,
    loading,
    pageInfo,
  } = useAssessmentStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  // const currentPhaseData = phases[currentPhase];
  // const question = currentPhaseData.questions[currentQuestion];
  const question = currentQuiz[currentQuestion];

  useEffect(() => {
    getQuiz();
  }, [getQuiz]);

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setAnswer(question.id, event.target.value);

    setAnswer(question.documentId, event.target.value);
  };

  const handleNextClick = () => {
    if (currentQuestion === currentQuiz.length - 1) {
      console.log("answer", answers);
      setDialogOpen(true);
    } else {
      moveToNextQuestion();
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* <Stepper activeStep={currentPhase}>
        {phases.map((phase) => (
          <Step key={phase.id} completed={phase.status === "completed"}>
            <StepLabel>{phase.name}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            maxWidth: "50%",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px", // Space between the steps
          }}
        >
          {phases.map((phase, index) => {
            const isActive = index + 1 === currentPhase;
            const isCompleted = phase.status === "completed";

            return (
              <Box
                key={phase.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  backgroundColor: isActive
                    ? "#f4a261"
                    : isCompleted
                    ? "#f4a261"
                    : "#fef4e9", // Light orange for inactive
                  color: isActive || isCompleted ? "#fff" : "#f4a261",
                  fontWeight: isActive ? "bold" : "normal",
                  position: "relative",
                  minWidth: "180px",
                  textAlign: "center",
                }}
              >
                <Typography variant="body1">{phase.name}</Typography>

                {/* Checkmark for Completed Step */}
                {isCompleted && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  >
                    <CheckIcon
                      sx={{
                        fontSize: "14px",
                        color: "#f4a261",
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
          // boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
          backgroundColor: "#FAFAFA",
        }}
      >
        <Typography variant="h6" gutterBottom>
          <Box sx={{ width: "100%", paddingY: "20px" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              Your Assessment
            </Typography>
            {/* <Assessment /> */}
            {/* Stepper Container */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px", // Space between step segments
              }}
            >
              {Array.from({ length: currentQuiz?.length }).map((_, index) => (
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
              ))}
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

        {/* <Typography>{question.text}</Typography> */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Chip
            label={`${currentQuestion + 1}`}
            sx={{ mr: 1, fontWeight: 500, fontSize: "20px" }}
          />
          <Typography variant="h5" sx={{ fontWeight: 500, fontSize: "20px" }}>
            {" "}
            {question?.title}
          </Typography>
        </Box>
        <RadioGroup
          value={answers[question?.documentId] || ""}
          onChange={handleAnswer}
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

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            disabled={currentQuestion === 0}
            onClick={moveToPreviousQuestion}
          >
            Previous
          </Button>
          <Button variant="contained" onClick={handleNextClick}>
            {currentQuestion === 29 ? "Finish Phase" : "Next"}
          </Button>
        </Box>
      </Box>

      <Dialog open={dialogOpen}>
        <DialogTitle>
          Do you want to proceed to the next assessment phase?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Disagree</Button>
          <Button
            onClick={() => {
              completePhase();
              setDialogOpen(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
