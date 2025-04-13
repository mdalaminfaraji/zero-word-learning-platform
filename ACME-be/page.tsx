
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import TimePeriodSelector from "@/components/dashboard/TimePeriodSelector";
import CustomSelect from "@/components/ui/CustomSelect";
import { useAuthStore } from "@/store/authStore";



// Styled components
const SaveButton = styled(Button)(() => ({
  backgroundColor: "#1A3A40",
  color: "white",
  borderRadius: "50px",
  padding: "10px 24px",
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#1A3A40",
  },
}));



const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: "#F1F5F9",
  "& .MuiTableCell-head": {
    fontWeight: 600,
    color: "#1E293B",
  },
}));

const AudienceTypeButton = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    backgroundColor: active ? "#1A3A40" : "#D2E8EC",
    color: active ? "white" : "#1E293B",
    borderRadius: "50px",
    padding: "10px 24px",
    textTransform: "none",
    fontWeight: 600,
    marginRight: "8px",
    marginBottom: "8px",
    "&:hover": {
      backgroundColor: active ? "#0F172A" : "#CBD5E1",
    },
  })
);

export default function AudienceManagement() {
  const { getAllUsers, users, loading, error, registerByAdmin } =
    useAuthStore();

  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [activeTab, setActiveTab] = useState<string>("Employee");
  const [timePeriod, setTimePeriod] = useState("Daily");
  console.log(timePeriod);
  // Handle form submission
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleSubmit = async () => {
    if (username && userType && contact && email && role) {
      try {
        await registerByAdmin({
          username,
          email,
          password: '123456', // Default password for admin-created users
          contact,
          role,
          userType
        });
        
        // Reset form
        setUsername("");
        setUserType("");
        setContact("");
        setEmail("");
        setRole("");
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      alert("Please fill all fields");
    }
  };



  // Handle audience type selection
  const handleAudienceTypeClick = (type: string) => {
    setActiveTab(type);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '1rem' }}>{error}</div>;
  }
  return (
    <Box sx={{ border: "1px solid #E7EAE9", borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E7EAE9",
          p: 3,
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Overview
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Track, Manage your all work by dashboard
          </Typography>
        </Box>
        <TimePeriodSelector onChange={setTimePeriod} defaultPeriod="Daily" />
      </Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(5, 1fr)" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#1E293B" }}
            >
              User Name
            </Typography>
            <TextField
              placeholder="Write your name"
              fullWidth
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#F8FAFC",
                },
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#1E293B" }}
            >
              User Type
            </Typography>
            <CustomSelect
              options={[
                { value: "Employee", label: "Employee" },
                { value: "Customer", label: "Customer" },
                { value: "Supplier", label: "Supplier" },
                { value: "Investor", label: "Investor" },
                { value: "Community", label: "Community" },
                { value: "Other", label: "Other" }
              ]}
              value={userType}
              onChange={(value) => setUserType(value)}
              placeholder="Select user type"
              label=""
            />
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#1E293B" }}
            >
              User Contact
            </Typography>
            <TextField
              placeholder="Write your Contact number"
              fullWidth
              size="small"
              value={contact}
              onChange={(e) => setContact(e.target.value.replace(/[^0-9+]/g, ""))}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#F8FAFC",
                },
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#1E293B" }}
            >
              User Email
            </Typography>
            <TextField
              placeholder="Write your Email"
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#F8FAFC",
                },
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#1E293B" }}
            >
              Audience Role
            </Typography>
            <CustomSelect
              options={[
                { value: "3", label: "Admin" },
                { value: "4", label: "General" },
              ]}
              value={role}
              onChange={(value) => setRole(value)}
              placeholder="Select role"
              label=""
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", mt: 2 }}>
          <SaveButton variant="contained" onClick={handleSubmit}>
            Save User
          </SaveButton>
        </Box>
      </Paper>

      {/* Audience Type Tabs */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          border: "1px solid #E7EAE9",
          p: 3,
        }}
      >
        <AudienceTypeButton
          active={activeTab === "Employee"}
          onClick={() => handleAudienceTypeClick("Employee")}
        >
          Employee
        </AudienceTypeButton>
        <AudienceTypeButton
          active={activeTab === "Customers"}
          onClick={() => handleAudienceTypeClick("Customers")}
        >
          Customers
        </AudienceTypeButton>
        <AudienceTypeButton
          active={activeTab === "Suppliers"}
          onClick={() => handleAudienceTypeClick("Suppliers")}
        >
          Suppliers
        </AudienceTypeButton>
        <AudienceTypeButton
          active={activeTab === "Investor"}
          onClick={() => handleAudienceTypeClick("Investor")}
        >
          Investor
        </AudienceTypeButton>
        <AudienceTypeButton
          active={activeTab === "Community"}
          onClick={() => handleAudienceTypeClick("Community")}
        >
          Community
        </AudienceTypeButton>
        <AudienceTypeButton
          active={activeTab === "Other"}
          onClick={() => handleAudienceTypeClick("Other")}
        >
          Other
        </AudienceTypeButton>
      </Box>

      {/* Audience Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid #E7EAE9",
          overflow: "hidden",
        }}
      >
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>User Contact</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User Role</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {users.map((user: {
              id: string;
              username: string;
              userType: string;
              contact: string;
              email: string;
              role?: { name: string };
            }) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#F8FAFC" },
                }}
              >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.userType}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
