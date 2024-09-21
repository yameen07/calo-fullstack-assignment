import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetchRandomUnsplashPhoto from "./unsplash.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobsFilePath = path.join(__dirname, "jobs.json");

// Function to process a job with retry logic
export async function processJob(job, retries = 3) {
  try {
    job.status = "in-progress";
    updateJobInFile(job);

    // Fetch a random Unsplash photo
    const imageUrl = await fetchRandomUnsplashPhoto();
    job.result = imageUrl;
    job.status = "resolved";

    updateJobInFile(job);

    console.log(`Job ${job.id} resolved with result: ${imageUrl}`);
  } catch (error) {
    // If retry attempts are left, retry the job
    if (retries > 0) {
      console.warn(`Retrying job ${job.id}. Attempts left: ${retries - 1}`);
      processJob(job, retries - 1);
    } else {
      // If no retry attempts are left, mark job as failed
      job.status = "failed";
      updateJobInFile(job);
      console.error(`Job ${job.id} failed after multiple attempts: `, error);
    }
  }
}

// Function to update the job in the file
function updateJobInFile(updatedJob) {
  try {
    let jobs = JSON.parse(fs.readFileSync(jobsFilePath));
    jobs = jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j));
    fs.writeFileSync(jobsFilePath, JSON.stringify(jobs));
  } catch (error) {
    console.error("Error updating job in file:", error);
  }
}
