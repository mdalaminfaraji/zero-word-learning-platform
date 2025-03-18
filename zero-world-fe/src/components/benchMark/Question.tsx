/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Grid2,
} from "@mui/material";

// interface QuestionProps {
//   question: {
//     title: string;
//     quizeType: "singleChoice" | "multipleChoice" | "dragAndDrop";
//     options: string[];
//   };
//   onAnswer: (answer: string | null) => void;
// }

const Question = ({ question, onAnswer }: any) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = () => {
    onAnswer(selectedAnswer);
    console.log("something", selectedAnswer);
  };

  return (
    <Box sx={{}}>
      {/* Question Title */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        {question?.title}
      </Typography>

      {/* Single Choice Options */}
      {question?.quizeType === "singleAnswer" && (
        <RadioGroup
          onChange={(e) => setSelectedAnswer(e.target.value)}
          sx={{ mb: 3 }}
        >
          <Grid2 container spacing={2}>
            {question?.options?.map((option: any, index: any) => (
              <Grid2 size={6} key={index}>
                <FormControlLabel
                  value={option}
                  control={
                    <Radio
                      sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {`(${String.fromCharCode(65 + index)})`} {option}
                    </Typography>
                  }
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    padding: 1,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </RadioGroup>
      )}

      {/* Multiple Choice Options */}
      {question?.quizeType === "multipleAnswer" && (
        <Box sx={{ mb: 3 }}>
          <Grid2 container spacing={2}>
            {question?.options.map((option: any, index: any) => (
              <Grid2 size={6} key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        setSelectedAnswer(e.target.checked ? option : null)
                      }
                      sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                    />
                  }
                  label={
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {option}
                    </Typography>
                  }
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    padding: 1,
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}

      {/* Drag and Drop Placeholder */}
      {question?.quizeType === "dragAndDrop" && (
        <Typography variant="body1" sx={{ mb: 3 }}>
          Drag and Drop UI (To be implemented)
        </Typography>
      )}

      {/* Next Button */}
      <Button
        variant="contained"
        onClick={handleAnswer}
        disabled={!selectedAnswer}
        sx={{
          mt: 2,
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: selectedAnswer ? "primary.main" : "action.disabled",
          "&:hover": {
            backgroundColor: selectedAnswer
              ? "primary.dark"
              : "action.disabledBackground",
          },
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Question;
