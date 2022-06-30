import serverless from "serverless-http";
import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import "reflect-metadata";
import * as controllers from "./controllers";

const routes = Object.values(controllers);
// import routess from './user/routes'
const app = express();

app.use(cors({ origin: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
// app.use("/user", routes);

routes.forEach((route) => {
  app.use("/api", route);
});

export default serverless(app);
