import express from "express";
const employeesRouter = express.Router();

// TODO: this file!

import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../db/queries/employees.js";

//HEY HEY
employeesRouter.get("/", async (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// GET ALL
employeesRouter.get("/employees", async (req, res) => {
  const employees = await getEmployees();
  res.status(200).send(employees);
});

// POST
employeesRouter.post("/employees", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is empty.");
  }

  const { name, birthday, salary } = req.body;
  try {
    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing fields.");
    }

    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).send(newEmployee);
  } catch (error) {
    console.error("Error creating employee: ", error);
    res.status(500).send("Internal server error.");
  }
});

// GET :ID
employeesRouter.get("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  try {
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).send("Invalid employee ID.");
    }

    const employee = await getEmployee(idNum);
    if (!employee) {
      return res.status(404).send("Employee not found.");
    }
    return res.status(200).send(employee);
  } catch (error) {
    console.error("Error fetching employee: ", error);
    res.status(500).send("Internal server error.");
  }
});

// PUT
employeesRouter.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  try {
    if (!req.body) {
      return res.status(400).send("Request body is empty.");
    }

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing fields.");
    }

    if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).send("Invalid employee ID.");
    }

    const employee = await getEmployee(idNum);
    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    const updatedEmployee = await updateEmployee({
      id: idNum,
      name,
      birthday,
      salary,
    });
    return res.status(200).send(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee: ", error);
    res.status(500).send("Internal server error.");
  }
});

// DELETE
employeesRouter.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);

  try {
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).send("Invalid employee ID.");
    }

    const employee = await getEmployee(idNum);
    if (!employee) {
      return res.status(404).send("Employee not found.");
    }
    await deleteEmployee(idNum);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting employee: ", error);
    res.status(500).send("Internal server error.");
  }
});

export default employeesRouter;
