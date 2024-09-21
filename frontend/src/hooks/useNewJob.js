import { useState } from "react";
import axios from "axios";

const useNewJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to create a new job
  const createNewJob = async (onJobCreated) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/jobs");
      onJobCreated(response.data);
    } catch (err) {
      console.error("Error creating a new job:", err);
      setError("Failed to create a new job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createNewJob,
  };
};

export default useNewJob;
