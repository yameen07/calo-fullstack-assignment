import React from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import useNewJob from "../hooks/useNewJob";

const NewJobForm = ({ onJobCreated }) => {
  const { loading, error, createNewJob } = useNewJob();

  const handleCreateNewJob = () => {
    createNewJob(onJobCreated);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateNewJob}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Create New Job"}
      </Button>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default NewJobForm;
