import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { processJob } from "./jobManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const jobsFilePath = path.join(__dirname, "jobs.json");
(async () => {
  try {
    // Check if jobs.json exists, if not create it
    await fs.access(jobsFilePath).catch(async () => {
      await fs.writeFile(jobsFilePath, JSON.stringify([]));
    });
  } catch (error) {
    console.error("Error initializing jobs file:", error);
  }
})();

// POST /jobs - Create a new job
app.post("/jobs", async (req, res) => {
  try {
    const jobId = uuidv4();
    const newJob = {
      id: jobId,
      status: "pending",
      result: null,
      createdAt: new Date().toISOString(),
    };

    let jobs = JSON.parse(await fs.readFile(jobsFilePath));
    jobs.push(newJob);
    await fs.writeFile(jobsFilePath, JSON.stringify(jobs));

    processJob(newJob);

    res.json({ id: jobId });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// GET /jobs - List all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = JSON.parse(await fs.readFile(jobsFilePath));
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET /jobs/:id - Get job status or result
app.get("/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobs = JSON.parse(await fs.readFile(jobsFilePath));
    const job = jobs.find((j) => j.id === jobId);

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error(`Error fetching job ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
