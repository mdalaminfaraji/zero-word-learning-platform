"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { MdVerified } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";
import { TbHelpHexagon } from "react-icons/tb";
import { PiChatCenteredTextLight } from "react-icons/pi";
import { MdOutlineDynamicForm } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
// import { MdTrendingDown } from "react-icons/md";
// import { MdTrendingUp } from "react-icons/md";

const menuItems = [
  { title: "Dashboard", icon: <RxDashboard />, path: "/" },
  { title: "Benchmark", icon: <MdVerified />, path: "/benchmark" },
  { title: "Pathway", icon: <BsListCheck />, path: "/pathway" },
  { title: "Action", icon: <MdOutlineDynamicForm />, path: "/action" },
  { title: "Analysis", icon: <MdOutlineAnalytics />, path: "/analysis" },
];

const supportItems = [
  { title: "Forum", icon: <PiChatCenteredTextLight />, path: "/forum" },
  { title: "Help", icon: <TbHelpHexagon />, path: "/help" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          bgcolor: "primary.main",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Image
          src="/images/acme_logo.png?height=40&width=120"
          alt="ACME Logo"
          width={120}
          height={40}
        />
      </Box>

      <Box
        sx={{
          px: 3,
          pb: 2,
          mb: 2,
          borderBottom: "2px dashed rgba(255,255,255,0.2)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}
        >
          Main Menu
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            href={item.path}
            sx={{
              py: 2,
              px: 3,
              color: "white",
              bgcolor:
                pathname === item.path ? "secondary.main" : "transparent",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
                fontSize: 24,
                marginRight: 0,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText sx={{ fontSize: 18 }} primary={item.title} />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          px: 3,
          pb: 2,
          mt: 4,
          borderBottom: "2px dashed rgba(255,255,255,0.2)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "rgba(255,255,255,0.7)", fontSize: 18 }}
        >
          Support
        </Typography>
      </Box>

      <List>
        {supportItems.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            href={item.path}
            sx={{
              py: 2,
              px: 3,
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
                fontSize: 24,
                marginRight: 0,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText sx={{ fontSize: 18 }} primary={item.title} />
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: "auto",
          mx: "auto",
          p: 3,
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.7)", mr: 2 }}
        >
          Powered by
        </Typography>
        <Image
          src="/images/zeroLogo.png?height=30&width=100"
          alt="Zero World Logo"
          width={100}
          height={30}
        />
      </Box>
    </Drawer>
  );
}
