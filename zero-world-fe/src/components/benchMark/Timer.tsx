import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const Timer = ({ timeLeft, onTimeUp }) => {
  const [seconds, setSeconds] = useState(timeLeft);

  useEffect(() => {
    if (seconds === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return <Typography>Time Left: {seconds}s</Typography>;
};

export default Timer;
