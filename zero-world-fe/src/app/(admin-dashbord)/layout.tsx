import { Box } from "@mui/material";
import React from "react";
import Header from "@/components/common/Header";
import AdminSidebar from "@/components/common/admin-sidebar";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AdminSidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Header />
          <Box sx={{ padding: 2 }}>{children}</Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AdminLayout;
