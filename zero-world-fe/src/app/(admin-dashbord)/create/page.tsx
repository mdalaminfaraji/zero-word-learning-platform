"use client";

import React, { useState } from "react";
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

// Define audience type
interface Audience {
  id: string;
  name: string;
  type: string;
  contact: string;
  email: string;
  role: string;
}

// Mock data for audience members
const mockAudiences: Audience[] = [
  {
    id: "1",
    name: "Rakibul Islam",
    type: "Customer",
    contact: "01897646368",
    email: "rak@gmail.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Rakibul Islam",
    type: "Customer",
    contact: "01897646368",
    email: "rak@gmail.com",
    role: "General",
  },
  {
    id: "3",
    name: "Rakibul Islam",
    type: "Customer",
    contact: "01897646368",
    email: "rak@gmail.com",
    role: "Admin",
  },
  {
    id: "4",
    name: "Rakibul Islam",
    type: "Customer",
    contact: "01897646368",
    email: "rak@gmail.com",
    role: "Admin",
  },
  {
    id: "5",
    name: "Rakibul Islam",
    type: "Customer",
    contact: "01897646368",
    email: "rak@gmail.com",
    role: "Admin",
  },
  {
    id: "6",
    name: "Rakibul Islam",
    type: "Customer",
    contact: "01897646368",
    email: "rak@gmail.com",
    role: "Admin",
  },
  {
    id: "7",
    name: "Rakibul Islam",
    type: "Customer",
    contact: "01897646368",
    email: "rak@gmail.com",
    role: "Admin",
  },
];

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

const EditButton = styled(Button)(() => ({
  backgroundColor: "#E2E8F0",
  color: "#1E293B",
  borderRadius: "50px",
  padding: "10px 24px",
  textTransform: "none",
  fontWeight: 600,
  marginLeft: "16px",
  "&:hover": {
    backgroundColor: "#CBD5E1",
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
  const [audienceData, setAudienceData] = useState<Audience[]>(mockAudiences);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Employee");
  const [timePeriod, setTimePeriod] = useState("Daily");
  console.log(timePeriod);
  // Handle form submission
  const handleSubmit = () => {
    if (name && type && contact && email && role) {
      if (editMode && currentId) {
        // Update existing audience
        setAudienceData(
          audienceData.map((audience) =>
            audience.id === currentId
              ? { ...audience, name, type, contact, email, role }
              : audience
          )
        );
        setEditMode(false);
        setCurrentId(null);
      } else {
        // Add new audience
        const newAudience: Audience = {
          id: Date.now().toString(),
          name,
          type,
          contact,
          email,
          role,
        };
        setAudienceData([...audienceData, newAudience]);
        console.log(newAudience);
      }
      // Reset form
      setName("");
      setType("");
      setContact("");
      setEmail("");
      setRole("");
    } else {
      alert("Please fill all fields");
    }
  };

  // Handle edit button click
  const handleEdit = (audience: Audience) => {
    setName(audience.name);
    setType(audience.type);
    setContact(audience.contact);
    setEmail(audience.email);
    setRole(audience.role);
    setEditMode(true);
    setCurrentId(audience.id);
  };

  // Handle audience type selection
  const handleAudienceTypeClick = (type: string) => {
    setActiveTab(type);
  };

  // Handle role change
  const handleRoleChange = (value: string) => {
    setRole(value);
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <TextField
              placeholder="Write user type"
              fullWidth
              size="small"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
              User Contact
            </Typography>
            <TextField
              placeholder="Write your Contact number"
              fullWidth
              size="small"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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
                { value: "Admin", label: "Admin" },
                { value: "General", label: "General" },
              ]}
              value={role}
              onChange={handleRoleChange}
              placeholder="Select type"
              label=""
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", mt: 2 }}>
          <SaveButton variant="contained" onClick={handleSubmit}>
            {editMode ? "Update Audience" : "Save Audience"}
          </SaveButton>
          {editMode && (
            <EditButton
              variant="contained"
              onClick={() => {
                setEditMode(false);
                setCurrentId(null);
                setName("");
                setType("");
                setContact("");
                setEmail("");
                setRole("");
              }}
            >
              Cancel
            </EditButton>
          )}
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
            {audienceData.map((audience) => (
              <TableRow
                key={audience.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#F8FAFC", cursor: "pointer" },
                }}
                onClick={() => handleEdit(audience)}
              >
                <TableCell>{audience.name}</TableCell>
                <TableCell>{audience.type}</TableCell>
                <TableCell>{audience.contact}</TableCell>
                <TableCell>{audience.email}</TableCell>
                <TableCell>{audience.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
