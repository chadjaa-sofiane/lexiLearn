import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.port || 3000;
app.use(cors());

app.listen(PORT, () => {
  console.log(`the app is running on the port: ${PORT}`);
});
