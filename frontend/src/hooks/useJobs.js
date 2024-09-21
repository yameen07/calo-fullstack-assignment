import { useState, useEffect } from "react";
import axios from "axios";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Function to fetch jobs from the backend
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/jobs");
        const sortedJobs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sortedJobs);
        setLoading(false);
        setError(null); // Reset error and count if request succeeds
        setRetryCount(0);
      } catch (err) {
        if (retryCount < 3) {
          // Maximum 3 retries
          setRetryCount(retryCount + 1);
          setTimeout(fetchJobs, Math.pow(2, retryCount) * 1000); // Delay will increase exponentially if backend is down
        } else {
          setError("Failed to fetch jobs after multiple attempts.");
          setLoading(false);
        }
      }
    };

    fetchJobs();

    // Set up an interval to refresh the job list every 5 seconds
    const interval = setInterval(fetchJobs, 5000);

    return () => clearInterval(interval);
  }, [retryCount]);

  return { jobs, loading, error };
};

export default useJobs;
