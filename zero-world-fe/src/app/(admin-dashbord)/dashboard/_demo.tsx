"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { BsArrowUpRight } from "react-icons/bs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const demoData = [
  { name: "Employees", color: "#22c55e" },
  { name: "Customers", color: "#22c55e" },
  { name: "Suppliers", color: "#22c55e" },
  { name: "Investors", color: "#22c55e" },
  { name: "Community", color: "#f59e0b" },
  { name: "Other", color: "#22c55e" },
  { name: "Investee", color: "#22c55e" },
];

const EmployeeCard = ({ title, color }) => {
  const data = [{ value: 10 }, { value: 8 }, { value: 15 }, { value: 20 }];

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#1f2937", fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
          Lorem Ipsum is simply dummy text of the printing.
        </Typography>
        <Box sx={{ height: 120, mb: 2 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis hide />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4 }}
                fill={color}
                fillOpacity={0.2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: 1,
            pt: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ color }}>
              {"200"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color }}
            >{`Total ${title}`}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", color }}>
            <BsArrowUpRight />
            <Typography variant="body2">10% this week</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => (
  <Container sx={{ py: 4 }}>
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
      Overview
    </Typography>
    <Typography variant="body2" sx={{ mb: 4 }}>
      Track, Manage your all work by dashboard
    </Typography>
    <Grid container spacing={2}>
      {demoData.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <EmployeeCard title={item.name} color={item.color} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default Dashboard;
