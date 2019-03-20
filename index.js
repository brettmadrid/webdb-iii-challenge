const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/api/students", async (req, res) => {
  try {
    const students = await db("students"); // all the records
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});


// student endpoints
server.get("/api/students/:id", async (req, res) => {
  try {
    const student = await db("students")
    .where({ id: req.params.id })
    .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all students by student
server.get("/api/students/:id/students", async (req, res) => {
  try {
    const student = await db("students")
    .join("students", "students.id", "=", "students.student_id")
    .select("students.name", "students.name")
    .where({ student_id: req.params.id })
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/students", async (req, res) => {
  try {
    const [id] = await db("students").insert(req.body);

    const student = await db("students")
    .where({ id })
    .first();

    res.status(201).json(student);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

server.put("/api/students/:id", async (req, res) => {
  try {
    const count = await db("students")
    .where({ id: req.params.id })
      .update(req.body);

      if (count > 0) {
        const student = await db("students")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

server.delete("/api/students/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .del();

      if (count > 0) {
        res.status(204).json({ message: "Successfully deleted!" });
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});


// students endpoints
server.get("/api/students", async (req, res) => {
  try {
    const students = await db("students"); // all the records
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get("/api/students/:id", async (req, res) => {
  try {
    const student = await db("students")
    .where({ id: req.params.id })
    .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
