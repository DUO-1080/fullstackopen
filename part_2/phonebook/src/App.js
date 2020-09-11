import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
