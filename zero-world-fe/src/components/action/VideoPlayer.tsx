"use client";

import ReactPlayer from "react-player";
import { Box, IconButton, Typography, Slider } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  Settings,
  Speed as SpeedIcon,
  Hd as HdIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  url: string;
}

// Define the type for ReactPlayer instance
type ReactPlayerInstance = ReactPlayer & {
  seekTo: (amount: number, type?: "seconds" | "fraction") => void;
};

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(true); // Start playing by default
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [fullscreen, setFullscreen] = useState(false);
  const [resolution, setResolution] = useState(720);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<"" | "speed" | "resolution">("");
  const [settingsPosition, setSettingsPosition] = useState({ top: 0, left: 0 });
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  
  // Reset playing state when URL changes
  useEffect(() => {
    setPlaying(true); // Auto-play when URL changes
    // Reset progress when changing videos
    setProgress(0);
  }, [url]);

  const playerRef = useRef<HTMLDivElement>(null);
  const reactPlayerRef = useRef<ReactPlayerInstance>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!fullscreen) {
        playerRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      setFullscreen(!fullscreen);
    }
  };

  const handleSettingsClick = () => {
    if (settingsButtonRef.current) {
      const rect = settingsButtonRef.current.getBoundingClientRect();
      setSettingsPosition({
        top: rect.top - 100, // Position above the button
        left: rect.left - 120, // Offset to the left
      });
      setSettingsOpen(!settingsOpen);
      setSubMenu("");
    }
  };

  const handleSubMenuClick = (menu: "speed" | "resolution") => {
    // When opening submenu, recalculate position to ensure it appears above settings button
    if (settingsButtonRef.current) {
      const rect = settingsButtonRef.current.getBoundingClientRect();
      setSettingsPosition({
        top: rect.top - 200, // Position even higher for submenu
        left: rect.left - 120,
      });
    }
    setSubMenu(menu);
  };

  const handleClose = () => {
    setSettingsOpen(false);
    setSubMenu("");
  };

  // Close settings popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsOpen &&
        settingsButtonRef.current &&
        !settingsButtonRef.current.contains(event.target as Node)
      ) {
        // Check if click is outside the settings popup too
        const settingsPopup = document.getElementById("settings-popup");
        if (settingsPopup && !settingsPopup.contains(event.target as Node)) {
          handleClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsOpen]);

  // Initialize states from localStorage only on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run in browser environment
      const storedPlaybackRate = localStorage.getItem("playbackRate");
      const storedVolume = localStorage.getItem("volume");
      const storedResolution = localStorage.getItem("resolution");

      if (storedPlaybackRate) setPlaybackRate(Number(storedPlaybackRate));
      if (storedVolume) setVolume(Number(storedVolume));
      if (storedResolution) setResolution(Number(storedResolution));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("playbackRate", playbackRate.toString());
      localStorage.setItem("volume", volume.toString());
      localStorage.setItem("resolution", resolution.toString());
    }
  }, [playbackRate, volume, resolution]);

  // Cleanup - ensure video stops playing when component unmounts
  useEffect(() => {
    return () => {
      setPlaying(false);
    };
  }, []);

  return (
    <Box
      ref={playerRef}
      sx={{
        position: "relative",
        aspectRatio: "16/9",
        bgcolor: "#1A3A40",
        borderRadius: 5,
        overflow: "hidden",
      }}
      onMouseEnter={() => {
        // Prepare the player controls to be visible when hovering
      }}
      onMouseLeave={() => {
        // Hide settings popup when mouse leaves the player area
        if (settingsOpen) {
          handleClose();
        }
      }}
    >
      {/* Add click handler wrapper around ReactPlayer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cursor: "pointer",
          zIndex: 5,
        }}
        onClick={() => setPlaying(!playing)}
      />
      <ReactPlayer
        ref={reactPlayerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        playbackRate={playbackRate}
        onProgress={({ played }) => setProgress(played)}
        onDuration={(seconds) => setDuration(seconds)}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 1,
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          display: "flex",
          alignItems: "center",
          gap: 1,
          zIndex: 10, // Ensure controls are above the click handler
        }}
      >
        {/* Play/Pause Button */}
        <IconButton
          size="small"
          onClick={() => setPlaying(!playing)}
          sx={{ color: "white" }}
        >
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>

        {/* Current Time */}
        <Typography
          sx={{ color: "white", fontSize: "0.875rem", minWidth: "35px" }}
        >
          {formatTime(progress * duration)}
        </Typography>

        {/* Progress Bar */}
        <Box
          sx={{
            flex: 1,
            height: 6,
            bgcolor: "rgba(255,255,255,0.3)",
            borderRadius: 1,
            position: "relative",
            cursor: "pointer",
          }}
          onClick={(e: React.MouseEvent) => {
            // Get the bounding rectangle of the progress bar
            const rect = e.currentTarget.getBoundingClientRect();
            const clickedProgress = Math.min(
              Math.max((e.clientX - rect.left) / rect.width, 0),
              1
            );

            if (reactPlayerRef.current) {
              // Seek to the clicked position
              reactPlayerRef.current.seekTo(clickedProgress, "fraction");

              // Set the progress state for immediate visual feedback
              setProgress(clickedProgress);

              // If video was paused, start playing from this position
              if (!playing) {
                setPlaying(true);
              }
            }
          }}
        >
          <Box
            sx={{
              width: `${progress * 100}%`,
              height: "100%",
              bgcolor: "primary.main",
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Remaining Time */}
        <Typography
          sx={{ color: "white", fontSize: "0.875rem", minWidth: "35px" }}
        >
          -{formatTime(duration - progress * duration)}
        </Typography>

        {/* Volume Control */}
        <IconButton
          size="small"
          onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
          sx={{ color: "white" }}
        >
          {volume > 0 ? <VolumeUp /> : <VolumeOff />}
        </IconButton>
        <Slider
          value={volume * 100}
          onChange={(e, newValue) => setVolume((newValue as number) / 100)}
          sx={{ width: 100, color: "white" }}
        />

        {/* Settings Button */}
        <IconButton
          ref={settingsButtonRef}
          size="small"
          onClick={handleSettingsClick}
          sx={{ color: "white" }}
        >
          <Settings />
        </IconButton>

        {/* Custom Settings Popup */}
        {settingsOpen && (
          <Box
            id="settings-popup"
            sx={{
              position: "fixed",
              top: `${settingsPosition.top}px`,
              left: `${settingsPosition.left}px`,
              zIndex: 1000,
              backgroundColor: "rgba(0,0,0,0.85)",
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              width: "200px",
              overflow: "hidden",
              padding: "8px 0",
            }}
          >
            {/* Main Menu */}
            {subMenu === "" && (
              <>
                <Box
                  onClick={() => handleSubMenuClick("speed")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 16px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <SpeedIcon sx={{ marginRight: "10px", fontSize: "20px" }} />
                  <Typography variant="body2">Playback Speed</Typography>
                </Box>
                <Box
                  onClick={() => handleSubMenuClick("resolution")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 16px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <HdIcon sx={{ marginRight: "10px", fontSize: "20px" }} />
                  <Typography variant="body2">Resolution</Typography>
                </Box>
              </>
            )}

            {/* Playback Speed Submenu */}
            {subMenu === "speed" && (
              <>
                <Box
                  sx={{
                    padding: "8px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SpeedIcon sx={{ marginRight: "10px", fontSize: "20px" }} />
                    <Typography variant="body2" fontWeight="bold">
                      Playback Speed
                    </Typography>
                  </Box>
                </Box>
                {[1, 1.25, 1.5, 1.75, 2].map((rate) => (
                  <Box
                    key={rate}
                    onClick={() => {
                      setPlaybackRate(rate);
                      handleClose();
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px 16px",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <Typography variant="body2">{rate}x</Typography>
                    {rate === playbackRate && (
                      <CheckIcon sx={{ color: "#4CAF50", fontSize: "18px" }} />
                    )}
                  </Box>
                ))}
              </>
            )}

            {/* Resolution Submenu */}
            {subMenu === "resolution" && (
              <>
                <Box
                  sx={{
                    padding: "8px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HdIcon sx={{ marginRight: "10px", fontSize: "20px" }} />
                    <Typography variant="body2" fontWeight="bold">
                      Resolution
                    </Typography>
                  </Box>
                </Box>
                {[360, 480, 720, 1080].map((res) => (
                  <Box
                    key={res}
                    onClick={() => {
                      setResolution(res);
                      handleClose();
                    }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 16px",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <Typography variant="body2">{res}p</Typography>
                    {res === resolution && (
                      <CheckIcon sx={{ color: "#4CAF50", fontSize: "18px" }} />
                    )}
                  </Box>
                ))}
              </>
            )}
          </Box>
        )}

        {/* Fullscreen Button */}
        <IconButton
          size="small"
          onClick={toggleFullscreen}
          sx={{ color: "white" }}
        >
          <Fullscreen />
        </IconButton>
      </Box>
    </Box>
  );
}
