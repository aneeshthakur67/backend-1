import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import fileupload from "./src/router/upload.router.js";
import connectDB from "./src/db/index.js";
import { ApiError } from "./src/utils/apiError.js";
import cookieParser from "cookie-parser";

const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

connectDB()
  .then(() => {
    console.log("connted");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Working");
});
app.use("/api/user", fileupload);

app.listen(PORT, () => {
  console.log(`server started at port : ${PORT}`);
  console.log("first");
});

app.use((err, req, res, next) => {
  res.status(500).json(new ApiError(500, err, "something went wrong"));
});
