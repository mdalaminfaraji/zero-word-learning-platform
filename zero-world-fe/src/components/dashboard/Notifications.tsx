import { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  Typography,
  Avatar,
  Divider,
  Box,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const notifications = [
    {
      id: 1,
      title: "Congratulations!",
      message: "Lorem Ipsum is simply dummy text...",
      time: "23 min ago",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      id: 2,
      title: "Congratulations!",
      message: "Lorem Ipsum is simply dummy text...",
      time: "23 min ago",
      avatar: "/path/to/avatar2.jpg",
    },
    {
      id: 3,
      title: "Congratulations!",
      message: "Lorem Ipsum is simply dummy text...",
      time: "23 min ago",
      avatar: "/path/to/avatar3.jpg",
    },
    {
      id: 4,
      title: "Congratulations!",
      message: "Lorem Ipsum is simply dummy text...",
      time: "23 min ago",
      avatar: "/path/to/avatar4.jpg",
    },
  ];

  return (
    <Box>
      <IconButton color="primary" onClick={handleOpenMenu}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ maxWidth: 360, borderRadius: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Notifications{" "}
            <Badge
              sx={{ ml: 1, bgcolor: "#2C606A" }}
              badgeContent={notifications.length}
              color="primary"
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mark all as a Read
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ maxHeight: 300, overflowY: "auto", width: 360 }}>
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Avatar src={notification.avatar} alt={notification.title} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.message.substring(0, 20)}...
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: 100 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="right"
                >
                  {notification.time}
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#F9E4C8",
                    color: "#ECA548",
                    borderRadius: "10px",
                    width: "50px",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.7rem",
                  }}
                >
                  new
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
          }}
        >
          <Button size="small" onClick={() => alert("Clear all clicked")}>
            Clear All
          </Button>
          <Button
            size="small"
            onClick={() => alert("View all notifications clicked")}
          >
            View all Notifications
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default NotificationDropdown;
