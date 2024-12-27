import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
dotenv.config({});
const app = express();
const corsOptions = {
  origin: "http//localhost:5173",
  credentials: true,
};
//middleware
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
const PORT = 3000;
// app.use("/jobs", jobsRouter);
app.use("/user", userRouter);
// app.use("/company", companyRouter);

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("server live at port " + process.env.PORT || PORT);
  });
})();  // self calling anonymous function
