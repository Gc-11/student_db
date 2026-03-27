const express = require("express");

const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(express.json());

// Dummy data (in-memory database)
let students = [
  { id: 1, name: "Gabriel", branch: "Computer", year: "SE" },
  { id: 2, name: "Rahul", branch: "IT", year: "TE" }
];


// 🔹 GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// 🔹 GET student by ID
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// 🔹 POST add new student
app.post("/students", (req, res) => {
  const { name, branch, year } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    branch,
    year
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// 🔹 PATCH update student
app.patch("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, branch, year } = req.body;

  if (name) student.name = name;
  if (branch) student.branch = branch;
  if (year) student.year = year;

  res.json({
    message: "Student updated successfully",
    student
  });
});

// 🔹 DELETE student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);

  res.json({ message: "Student deleted successfully" });
});

module.exports = app;