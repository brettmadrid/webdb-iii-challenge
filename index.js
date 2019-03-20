const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await db("cohorts"); // all the records
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get("/api/students", async (req, res) => {
  try {
    const students = await db("students"); // all the records
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list a cohort by id
server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all students by cohort
server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const cohort = await db("cohorts")
    .join("students", "cohorts.id", "=", "students.cohort_id")
    .select("cohorts.name", "students.name")
    .where({ cohort_id: req.params.id })
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/cohorts", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);

    const cohort = await db("cohorts")
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).json({ message: "Successfully deleted!" });
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
