import YourActivity from "@/components/analysis/YourActivity";
import CourseList from "@/components/courses/CourseList";
import AssignmentCard from "@/components/dashboard/AssignmentCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import TaskProgress from "@/components/dashboard/TaskProgress";
import GaugeChart from "@/components/PointProgress";
import ProgressCards from "@/components/ProgressCards";
import { progressItems, upcomingSchedule } from "@/helpers/dashboardHelpers";
import { Box, Typography, Breadcrumbs, Link, Divider } from "@mui/material";
const Dashboard = () => {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            style={{ fontWeight: 500, fontSize: 18 }}
          >
            Home
          </Link>
          <Typography color="text.primary" variant="h6">
            Dashboard
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          border: "1px solid #E7EAE9",
          borderRadius: 3,
          p: 3,
          bgcolor: "#FAFAFA",
        }}
      >
        <Box sx={{ border: "1px solid #E7EAE9", borderRadius: 3, mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, borderBottom: "1px solid #E7EAE9", p: 2 }}
            fontWeight="bold"
          >
            Your Progress
          </Typography>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 1.5,
              p: 2,
              flexWrap: "wrap",
              justifyContent: "space-between",
              "& > *": {
                flex: "1 1 calc(25% - 16px)",
                minWidth: "250px",
              },
            }}
          >
            {progressItems.map((item) => (
              <ProgressCards key={item.title} {...item} />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: { md: "1fr .7fr 1fr .8fr" },
            mb: 4,
          }}
        >
          <GaugeChart score={8.966} percentage={52} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <AssignmentCard />
            <TaskProgress />
          </Box>
          <ProjectCard />
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              mb={2}
              sx={{ pl: 2, pt: 2 }}
            >
              Upcoming Schedule
            </Typography>
            <Divider />
            {upcomingSchedule.map((item, index) => (
              <Box key={index} sx={{ mt: 2, px: 1.5, pb: 1 }}>
                <Typography variant="caption" fontWeight="bold">
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="caption">{item.date} </Typography>
                  <Typography variant="caption" color="secondary">
                    {item.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { lg: "1fr 1.7fr" },
            mb: 4,
          }}
        >
          <YourActivity />
          <CourseList />
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
