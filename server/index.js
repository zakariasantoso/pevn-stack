const express = require("express");
const app = express();
const PORT = 3000;
const createEmployeeTable = require("./db/EmployeeStorage");
const db = require("./db/index");

app.use(express.json());

app.post("/api/employees", async (req, res, next) => {
  try {
    const { name, email, phone, position, salary } = req.body;
    const result = await db.query("INSERT INTO employees (name, email, phone, position, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, phone, position, salary]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get("/", async (req, res) => {
  res.send("Hello World! V2");
});

app.get("/api/employees", async (req, res, next) => {
  try {
    let sql = "SELECT * FROM employees";
    let results = await (await db.query(sql)).rows;
    res.send(results);
  } catch (error) {
    console.log(error);
    next(error); // pass error to express error handler
  }
});

app.get("/api/employees/:id", async (req, res, next) => {
  try {
    let sql = "SELECT * FROM employees WHERE id = $1";
    let results = await (await db.query(sql, [req.params.id])).rows;
    res.send(results);
  } catch (error) {
    console.log(error);
    next(error); // pass error to express error handler
  }
});

app.listen(PORT, async () => {
  try {
    await createEmployeeTable();
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
