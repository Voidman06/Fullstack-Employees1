import express from "express";
const router = express.Router();

// TODO: this file!

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

//HEY HEY
router.get("/", (req, res) => {
  res.send("You are now connected to the Fullstack Employees API.");
});

// GET ALL
router.get("/employees", async (req, res) => {
  const employees = await getEmployees();
  res.status(200).json(employees);
});

// GET :ID
router.get("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    return res.status(400).json({ error: "Invalid employee ID." });
  }

  const employee = await getEmployee(idNum);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found." });
  }
  return res.status(200).json({ employee });
});

// POST
router.post("/employees", async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty." });
  }

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing fields." });
  }

  const newEmployee = await createEmployee({ name, birthday, salary });
  res.status(201).json({ newEmployee });
});

// PUT
router.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is empty." });
  }

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing fields." });
  }

  if (!Number.isInteger(idNum) || idNum <= 0) {
    return res.status(400).json({ error: "Invalid employee ID." });
  }

  const employee = await getEmployee(idNum);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found." });
  }

  const updatedEmployee = await updateEmployee({
    id: idNum,
    name,
    birthday,
    salary,
  });
  return res.status(200).json({ updatedEmployee });
});

// DELETE
router.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    return res.status(400).json({ error: "Invalid employee ID." });
  }

  const employee = await getEmployee(idNum);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found." });
  }
  await deleteEmployee(idNum);
  res.status(204).send();
});

export default router;
