const db = require("./index");
const TABLE_NAME = "employees";

async function createEmployeeTable() {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        salary INTEGER NOT NULL
    )`;
    await db.query(query);
  } catch (error) {
    console.log(error);
  }
}

module.exports = createEmployeeTable;
