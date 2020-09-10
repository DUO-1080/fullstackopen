import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filterName, setFilterName] = useState("");

  const handleFilter = (name) => {
    setFilterName(name.toLowerCase());
  };

  const handleAddPerson = (person) => {
    const exist = persons.some(
      (p) => p.name.toLowerCase() === person.name.toLowerCase()
    );
    if (exist) {
      alert(`${person.name} is already added to phonebook.`);
    } else {
      setPersons(persons.concat(person));
    }
  };

  const filteredPerson = filterName
    ? persons.filter((person) => person.name.toLowerCase().includes(filterName))
    : persons;

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter onFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onAddPerson={handleAddPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPerson} />
    </div>
  );
}

export default App;
