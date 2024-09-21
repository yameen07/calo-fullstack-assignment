import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import JobList from "./components/JobList";
import NewJobForm from "./components/NewJobForm";
import JobDetails from "./components/JobDetails";

const App = () => {
  const [jobCreated, setJobCreated] = useState(false);

  const handleJobCreated = () => {
    setJobCreated(!jobCreated);
  };

  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        CALO Assignment
      </Typography>
      <NewJobForm onJobCreated={handleJobCreated} />
      <JobList key={jobCreated} />
      <JobDetails />
    </Container>
  );
};

export default App;
