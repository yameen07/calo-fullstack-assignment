import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { CheckCircle, HourglassEmpty } from "@mui/icons-material";
import useJobs from "../hooks/useJobs";

const JobList = () => {
  const { jobs, loading, error } = useJobs();

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
      <Typography variant="h2" gutterBottom>
        Job List
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : jobs.length === 0 ? ( // Check if no jobs are present
        <Typography variant="body1" color="textSecondary" align="center">
          No jobs present
        </Typography>
      ) : (
        <Box
          sx={{
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          <List>
            {jobs.map((job, index) => (
              <ListItem
                key={job.id}
                sx={{
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <ListItemIcon>
                  {job.status === "resolved" ? (
                    <CheckCircle color="primary" />
                  ) : (
                    <HourglassEmpty color="secondary" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`Job ID: ${job.id}`}
                  secondary={
                    job.status === "resolved"
                      ? `Result: Image Available`
                      : "Status: Pending"
                  }
                />
                {job.status === "resolved" && (
                  <img
                    src={job.result}
                    alt="Unsplash Random"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      marginLeft: "16px",
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default JobList;
