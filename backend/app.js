import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import menteeRoutes from "./routes/menteeRoutes.js";   // 🔥 ADD
import mentorRoutes from "./routes/mentorRoutes.js";   // 🔥 ADD

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/mentee", menteeRoutes);   // 🔥 ADD
app.use("/api/v1/mentor", mentorRoutes);   // 🔥 ADD

app.use(errorMiddleware);

export default app;
