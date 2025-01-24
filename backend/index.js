import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./config/db.js";
import express from "express";
const app = express();

const port = process.env.PORT;

connectToDB();

app.get('/', (req, res) => {
  res.send("This is from API");
});

app.listen(port, () => {
  console.log(`Server is up and running at port: ${port}`);
});

