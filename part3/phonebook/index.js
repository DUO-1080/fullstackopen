const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token(
  "person",
  (req) =>
    (req.method === "POST" || req.method === "PUT") && JSON.stringify(req.body)
);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person "
  )
);

app.get("/api/persons", (_, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (_, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      }</p>  ${new Date().toUTCString()}`
    );
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log("delete result:", result);
      result ? res.status(204).end() : res.status(404).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ err: "name missing." });
  } else if (!req.body.number) {
    res.status(400).json({ err: "number missing" });
  } else {
    const person = new Person({
      name: req.body.name,
      number: req.body.number,
    });
    person
      .save()
      .then((person) => {
        res.json(person);
      })
      .catch((error) => next(error));
  }
});

app.put("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, number: req.body.number },
    { new: true }
  )
    .then((updatePerson) => {
      res.json(updatePerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError" && error.kind == "ObjectId") {
    return res.status(400).send({
      error: "malformatted id",
    });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
