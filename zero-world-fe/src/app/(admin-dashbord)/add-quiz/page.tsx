/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  IconButton,
  Paper,
  TextField,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Grid2,
} from "@mui/material";

import { useState, useEffect } from "react";
import CustomSelect from "@/components/ui/CustomSelect";
import { Add, Delete, Info } from "@mui/icons-material";
import { Quiz, useQuizStore } from "@/store/useQuizStore";
import toast from "react-hot-toast";

const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  quizeType: z.enum(
    ["singleAnswer", "multipleAnswer", "imageBased", "dragAndDrop"],
    {
      required_error: "Quiz type is required",
    }
  ),
  phase: z.enum(["Understanding", "Developing", "Performing", "Leading"], {
    required_error: "Phase is required",
  }),
  duration: z
    .number()
    .min(1, "Duration must be at least 30 seconds")
    .optional(),
  options: z.array(z.string()).min(2, "At least 2 options are required"),
  answer: z.array(z.string()).min(1, "At least 1 answer is required"),
});

type QuizFormData = z.infer<typeof quizSchema>;

export default function AddQuiz() {
  const { createQuiz, loading } = useQuizStore();

  // Use state to manage dynamic fields instead of useFieldArray
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [answers, setAnswers] = useState<string[]>([""]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      options: ["", ""],
      answer: [""],
      quizeType: "singleAnswer",
      phase: "Understanding",
    },
  });

  const quizType = watch("quizeType");

  // Update answers when quiz type changes
  useEffect(() => {
    if (quizType === "singleAnswer" && answers.length > 1) {
      // If changing to single answer and we have multiple answers, keep only the first one
      const newAnswers = [answers[0]];
      updateAnswers(newAnswers);
    }
  }, [quizType]);

  // Update form values when options or answers change
  const updateOptions = (newOptions: string[]) => {
    setOptions(newOptions);
    setValue("options", newOptions);
  };

  const updateAnswers = (newAnswers: string[]) => {
    setAnswers(newAnswers);
    setValue("answer", newAnswers);
  };

  // Add new option
  const addOption = () => {
    updateOptions([...options, ""]);
  };

  // Remove option at index
  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    updateOptions(newOptions);
  };

  // Add new answer
  const addAnswer = () => {
    // Only add new answer if it's a multiple answer quiz
    if (quizType === "multipleAnswer") {
      updateAnswers([...answers, ""]);
    }
  };

  // Remove answer at index
  const removeAnswer = (index: number) => {
    // For single answer quizzes, don't allow removing the only answer
    if (quizType === "singleAnswer" && answers.length <= 1) {
      return;
    }

    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    updateAnswers(newAnswers);
  };

  // Handle option change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    updateOptions(newOptions);
  };

  // Handle answer change
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    updateAnswers(newAnswers);
  };

  const onSubmit: SubmitHandler<QuizFormData> = async (data) => {
    try {
      console.log(data);
      const body: Quiz = {
        title: data.title,
        quizeType: data.quizeType,
        options: data.options,
        phase: data.phase,
        answer: data.answer,
        description: data.description || "",
        duration: data.duration || 0,
        isActive: true,
      };
      await createQuiz(body);
      toast.success("Quiz created successfully!");

      // Reset form and state
      reset({
        title: "",
        description: "",
        quizeType: "singleAnswer",
        phase: "Understanding",
        duration: undefined,
        options: ["", ""],
        answer: [""],
      });
      setOptions(["", ""]);
      setAnswers([""]);
    } catch (error) {
      toast.error("Failed to create quiz. Please try again.");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0.5} sx={{ p: 4 }}>
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4">Add New Quiz</Typography>
          <Tooltip title="Create a new quiz with options and answers">
            <Info color="primary" />
          </Tooltip>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label="Question"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label="Question Description"
                multiline
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
                {...register("description")}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                name="quizeType"
                control={control}
                render={({ field }) => (
                  <>
                    <CustomSelect
                      label="Quiz Type"
                      options={[
                        { value: "singleAnswer", label: "Single Answer" },
                        { value: "multipleAnswer", label: "Multiple Answer" },
                        { value: "imageBased", label: "Image Based" },
                        { value: "dragAndDrop", label: "Drag and Drop" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.quizeType && (
                      <FormHelperText error>
                        {errors.quizeType.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Controller
                name="phase"
                control={control}
                render={({ field }) => (
                  <>
                    <CustomSelect
                      label="Phase"
                      options={[
                        { value: "Understanding", label: "Understanding" },
                        { value: "Developing", label: "Developing" },
                        { value: "Performing", label: "Performing" },
                        { value: "Leading", label: "Leading" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.phase && (
                      <FormHelperText error>
                        {errors.phase.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Duration (minutes)"
                {...register("duration", { valueAsNumber: true })}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">Options</Typography>
                    <Tooltip title="Add at least 2 options for the quiz">
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  {options.map((option, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Controller
                        name={`options.${index}` as any}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOptionChange(index, e.target.value);
                            }}
                            error={!!errors.options?.[index]}
                            helperText={
                              errors.options?.[index]?.message as string
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px",
                                "& fieldset": {
                                  border: "none",
                                },
                              },
                            }}
                          />
                        )}
                      />
                      {index > 1 && (
                        <IconButton
                          color="error"
                          onClick={() => removeOption(index)}
                          sx={{ "&:hover": { backgroundColor: "lightgray" } }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  <Button
                    startIcon={<Add />}
                    onClick={addOption}
                    variant="outlined"
                    size="small"
                  >
                    Add Option
                  </Button>
                </CardContent>
              </Card>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Card variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h6">
                        {quizType === "multipleAnswer" ? "Answers" : "Answer"}
                      </Typography>
                      <Tooltip
                        title={
                          quizType === "multipleAnswer"
                            ? "Add multiple correct answers"
                            : "Add the correct answer"
                        }
                      >
                        <Info fontSize="small" color="primary" />
                      </Tooltip>
                    </Box>
                    {quizType === "singleAnswer" && (
                      <Typography variant="caption" color="text.secondary">
                        Single answer mode - only one answer allowed
                      </Typography>
                    )}
                  </Box>
                  {answers.map((answer, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Controller
                        name={`answer.${index}` as any}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            size="small"
                            fullWidth
                            label={`Answer ${index + 1}`}
                            value={answer}
                            onChange={(e) => {
                              field.onChange(e);
                              handleAnswerChange(index, e.target.value);
                            }}
                            error={!!errors.answer?.[index]}
                            helperText={
                              errors.answer?.[index]?.message as string
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px",
                                "& fieldset": {
                                  border: "none",
                                },
                              },
                            }}
                          />
                        )}
                      />
                      {quizType === "multipleAnswer" && index > 0 && (
                        <IconButton
                          color="error"
                          onClick={() => removeAnswer(index)}
                          sx={{ "&:hover": { backgroundColor: "lightgray" } }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  {quizType === "multipleAnswer" && (
                    <Button
                      startIcon={<Add />}
                      onClick={addAnswer}
                      variant="outlined"
                      size="small"
                    >
                      Add Answer
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 4 }}
            disabled={loading}
          >
            {loading ? "Creating Quiz..." : "Create Quiz"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
