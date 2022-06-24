import serverless from "serverless-http";
import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

import routes from './user/routes'
const app = express();

app.use(cors({ origin: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/user', routes);

const server = serverless(app);

export async function handler(context, req) {
  context.res = await server(context, req);
}
