import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import { useQuizStore } from "@/store/useQuizStore";
import Question from "./Question";

const Assessment = () => {
  const { currentQuestion, loading, loadQuestion, handleNext } = useQuizStore();

  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* <Timer timeLeft={timeLeft} onTimeUp={() => handleNext("")} /> */}
          <Question question={currentQuestion} onAnswer={handleNext} />
        </>
      )}
    </>
  );
};

export default Assessment;
