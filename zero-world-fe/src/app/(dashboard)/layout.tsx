import { Box } from "@mui/material";
import React from "react";

import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Header />
          <Box sx={{ padding: 2 }}>{children}</Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MainLayout;
