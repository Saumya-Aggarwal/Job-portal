import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";
import path from "path";
import { fileURLToPath } from "url";

// Properly set up __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const corsOptions = {
  origin: [" https://job-portal-08im.onrender.com/"],
  credentials: true,
};

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

// API routes
app.use("/application", applicationRouter);
app.use("/job", jobRouter);
app.use("/user", userRouter);
app.use("/company", companyRouter);

// Serve frontend static files - make sure the path is correct
const frontendPath = path.resolve(__dirname, "..", "frontend", "dist");

// Add a check to make sure the static files exist
try {
  const fs = await import("fs");
  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));

    // Catch-all route to serve index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
    });
  } else {
    console.warn(
      `Warning: Frontend build directory not found at ${frontendPath}`
    );
  }
} catch (err) {
  console.error("Error setting up static file serving:", err);
}

// Connect to database and start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
})();
