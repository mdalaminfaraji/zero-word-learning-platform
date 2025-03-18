"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { Close, KeyboardArrowDown } from "@mui/icons-material";

interface NoteTakingProps {
  open: boolean;
  onClose: () => void;
}

export default function NoteTaking({ open, onClose }: NoteTakingProps) {
  const [noteText, setNoteText] = useState("");
  const [wordFileSend, setWordFileSend] = useState(false);
  const [shareAnchorEl, setShareAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const textFieldRef = useRef<HTMLDivElement>(null);

  // Focus on the text field when the modal opens
  useEffect(() => {
    if (open && textFieldRef.current) {
      setTimeout(() => {
        const input = textFieldRef.current?.querySelector("textarea");
        if (input) input.focus();
      }, 100);
    }
  }, [open]);

  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const handleShareOption = (option: string) => {
    console.log("Share option selected:", option);
    handleShareClose();
  };

  const handleSend = () => {
    console.log("Sending note:", noteText);
    console.log("Word file send:", wordFileSend);
    // Reset form
    setNoteText("");
    setWordFileSend(false);
    // Close modal
    onClose();
  };

  const shareOpen = Boolean(shareAnchorEl);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="note-taking-modal"
      aria-describedby="note-taking-description"
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "right",
        outline: "none",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "background.paper",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          margin: 2,
          position: "relative",
          bottom: 120,
          right: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#203A43",

            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" color="white">
            Note-taking
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>

        {/* Note Content Area */}
        <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
          <TextField
            ref={textFieldRef}
            multiline
            fullWidth
            rows={10}
            placeholder="Enter your notes here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#f9f9f9",
                borderRadius: 4,
              },
            }}
          />
        </Box>

        {/* Bottom Action Area */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={wordFileSend}
                  onChange={(e) => setWordFileSend(e.target.checked)}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  Word File send
                </Typography>
              }
            />

            <Button
              endIcon={<KeyboardArrowDown />}
              onClick={handleShareClick}
              sx={{
                ml: 2,
                textTransform: "none",
                color: "#203A43",
              }}
            >
              Share
            </Button>
            <Popover
              open={shareOpen}
              anchorEl={shareAnchorEl}
              onClose={handleShareClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Paper elevation={0}>
                <List sx={{ width: 180, p: 0 }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleShareOption("email")}
                      sx={{ py: 1 }}
                    >
                      <ListItemText primary="Share via email" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleShareOption("forum")}
                      sx={{ py: 1 }}
                    >
                      <ListItemText primary="Share to forum" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleShareOption("notes")}
                      sx={{ py: 1 }}
                    >
                      <ListItemText primary="Share to notes" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Paper>
            </Popover>
          </Box>

          <Button
            variant="contained"
            onClick={handleSend}
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
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
