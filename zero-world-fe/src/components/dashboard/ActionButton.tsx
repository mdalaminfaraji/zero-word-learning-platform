import React, { forwardRef } from "react";
import { Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

// Custom styled button
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0F172A", // dark blue as in the image
  color: theme.palette.common.white,
  padding: "8px 16px",
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#1E293B", // slightly lighter blue on hover
  },
  "& .MuiButton-endIcon": {
    marginLeft: 8,
  },
}));

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(({
  text,
  onClick,
  icon = <AddIcon />,
}, ref) => {
  return (
    <StyledButton 
      variant="contained" 
      onClick={onClick} 
      endIcon={icon}
      ref={ref}
    >
      {text}
    </StyledButton>
  );
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;
