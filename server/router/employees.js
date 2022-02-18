const express = require("express");
const router = express.Router();
const db = require("../db");

// create data
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, position, salary } = req.body;
    const result = await db.query("INSERT INTO employees (name, email, phone, position, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, phone, position, salary]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// read all employees
router.get("/", async (req, res, next) => {
  try {
    let sql = "SELECT * FROM employees";
    let results = await (await db.query(sql)).rows;
    res.send(results);
  } catch (error) {
    console.log(error);
    next(error); // pass error to express error handler
  }
});

// read employee by id
router.get("/:id", async (req, res, next) => {
  try {
    let sql = "SELECT * FROM employees WHERE id = $1";
    let results = await (await db.query(sql, [req.params.id])).rows;
    res.send(results);
  } catch (error) {
    console.log(error);
    next(error); // pass error to express error handler
  }
});

// update employee by id
router.put("/:id", async (req, res, next) => {
  try {
    let sql = "UPDATE employees SET name = $1, email = $2, phone = $3, position = $4, salary = $5 WHERE id = $6 RETURNING *";
    let results = await (await db.query(sql, [req.body.name, req.body.email, req.body.phone, req.body.position, req.body.salary, req.params.id])).rows;
    res.send(results);
  } catch (error) {
    console.log(error);
    next(error); // pass error to express error handler
  }
});

// delete employee by id
router.delete("/:id", async (req, res, next) => {
  try {
    let sql = "DELETE FROM employees WHERE id = $1 RETURNING *";
    let results = await (await db.query(sql, [req.params.id])).rows;
    res.send(results);
  } catch (error) {
    console.log(error);
    next(error); // pass error to express error handler
  }
});

module.exports = router;
