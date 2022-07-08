import serverless from "serverless-http";
import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import "reflect-metadata";
import * as controllers from "./controllers";
import upload from "express-fileupload";
const routes = Object.values(controllers);
const app = express();

app.use(cors({ origin: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(upload());
app.use("*", (req, res) => {
  res.status(404).json({ message: `API route not found, ${req.originalUrl}` });
});

routes.forEach((route) => {
  app.use("/api", route);
});

export default serverless(app);
