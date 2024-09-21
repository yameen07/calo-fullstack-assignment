import { useState } from "react";
import axios from "axios";

const useJobDetails = () => {
  const [jobId, setJobId] = useState("");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch job details by ID
  const fetchJobDetails = async () => {
    if (!jobId.trim()) {
      setError("Please enter a valid Job ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/jobs/${jobId}`);
      setJob(response.data);
    } catch (err) {
      setError("Job not found. Please check the Job ID and try again.");
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setJobId("");
    setJob(null);
    setError(null);
  };

  return {
    jobId,
    setJobId,
    job,
    loading,
    error,
    fetchJobDetails,
    reset,
  };
};

export default useJobDetails;
