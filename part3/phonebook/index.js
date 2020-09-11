const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
morgan.token("person", (req) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person ",
    {
      skip: (req, res) => req.method !== "POST",
    }
  )
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Feng DUO",
    number: "123123",
    id: 5,
  },
];

const getRandomId = () => {
  return Math.floor(Math.random() * 10000000);
};

app.get("/api/persons", (_, res) => {
  res.json(persons);
});

app.get("/info", (_, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    }</p>  ${new Date().toUTCString()}`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  let person = req.body;
  if (!person.name) {
    res.status(400).json({ err: "name missing." });
  } else if (!person.number) {
    res.status(400).json({ err: "number missing" });
  } else {
    const exist = persons.some((p) => p.name === person.name);
    if (exist) {
      res.status(400).json({ err: "name must be unique" });
    } else {
      person = { ...person, id: getRandomId() };
      persons = persons.concat(person);
      res.json(person);
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
