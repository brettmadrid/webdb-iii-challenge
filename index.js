const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts'); // all the records
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/students', async (req, res) => {
  try {
    const students = await db('students'); // all the records
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));