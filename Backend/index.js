import cors from "cors";
import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import { dbConnect } from "./config/db.js";
import adminRoute from "./routes/adminRoute.js";
import router from "./routes/userRoute.js";

const app = express();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

if (process.env.CORS_ORIGIN) {
  corsOrigins.push(process.env.CORS_ORIGIN.trim());
}

const normalize = (url) => url.replace(/\/$/, "");

const uniqueOrigins = [
  ...new Set(corsOrigins.filter(Boolean).map(normalize))
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients and same-origin requests without Origin header.
      if (!origin) {
        return callback(null, true);
      }

      if (uniqueOrigins.length === 0 || uniqueOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

const PORT = Number(process.env.PORT) || 8080;

app.use("/img", express.static("uploads"));
app.use("/Frontend/public/img/", express.static("uploads"));
app.use("/api", adminRoute);
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server Running on", PORT);
});
