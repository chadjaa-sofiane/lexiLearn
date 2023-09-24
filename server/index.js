import express, { json } from "express";
import cors from "cors";
import { gptRouter } from "./routers/index.js";

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(json());
app.use(gptRouter);

app.listen(PORT, () => {
  console.log(`the app is running on the port: ${PORT}`);
});
