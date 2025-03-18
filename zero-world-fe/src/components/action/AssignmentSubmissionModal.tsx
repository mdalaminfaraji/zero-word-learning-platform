"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

interface AssignmentSubmissionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AssignmentSubmissionModal({
  open,
  onClose,
}: AssignmentSubmissionModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          You have to submit your assignment otherwise you will not see next
          video
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: "#203A43",
            color: "white",
            borderRadius: 50,
            textTransform: "none",
            px: 4,
            py: 1,
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#152a31",
            },
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
