import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function fetchRandomUnsplashPhoto() {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query: "food",
        client_id: UNSPLASH_ACCESS_KEY,
      },
      timeout: 300000, // 5 minutes timeout
    });

    return response.data.urls.regular;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out:", error);
      throw new Error("Request timed out after 5 minutes");
    } else {
      console.error("Error fetching random photo from Unsplash:", error);
      throw new Error("Unable to fetch random photo");
    }
  }
}

export default fetchRandomUnsplashPhoto;
