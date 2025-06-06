import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("this is orbis");
});

app.listen(5000, () => {
  console.log("Server is running at port: 5000");
});
