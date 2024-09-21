import React from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import useJobDetails from "../hooks/useJobDetails";

const JobDetails = () => {
  const { jobId, setJobId, job, loading, error, fetchJobDetails, reset } =
    useJobDetails();

  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Job Details
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        <TextField
          label="Job ID"
          variant="outlined"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={fetchJobDetails}>
          Details
        </Button>
        <Button variant="outlined" color="secondary" onClick={reset}>
          Reset
        </Button>
      </Box>

      {loading && <CircularProgress />}

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      {job && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Job ID: {job.id}</Typography>
          <Typography variant="body1">Status: {job.status}</Typography>
          {job.result && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1">Result:</Typography>
              <img
                src={job.result}
                alt="Job Result"
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  marginTop: "8px",
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default JobDetails;
