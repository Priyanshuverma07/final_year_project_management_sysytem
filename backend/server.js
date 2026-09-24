import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import cron from "node-cron";

import { runCleanup } from "./services/cleanupService.js";


dotenv.config();
connectDB();

cron.schedule("0 0 * * *", () => {   // daily at midnight
  runCleanup();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
