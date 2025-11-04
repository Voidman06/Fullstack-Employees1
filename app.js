import express from "express";
const app = express();

// TODO: this file!

import employeesRouter from "./api/employees.js";

app.use(express.json());

app.use("/", employeesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  res.status(status).json({ error: err.message ?? "Internal server error" });
});

export default app;
