import React, { useState, useEffect } from "react";
import phoneService from "./services/phoneService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    phoneService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleFilter = (name) => {
    setFilterName(name.toLowerCase());
  };

  const handleAddPerson = (person) => {
    const existPerson = persons.find(
      (p) => p.name.toLowerCase() === person.name.toLowerCase()
    );
    console.log("exist person:", existPerson);
    if (existPerson) {
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with the new one?`
      ) &&
        phoneService
          .update(existPerson.id, person)
          .then((person) =>
            setPersons(persons.map((p) => (p.id === person.id ? person : p)))
          );
    } else {
      phoneService
        .addPerson(person)
        .then((person) => setPersons(persons.concat(person)));
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    window.confirm(`Delete ${person.name}`) &&
      phoneService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((err) => {
          console.log("cannot able to delete " + person.name, err);
        });
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
      <Persons persons={filteredPerson} onDeletePerson={handleDeletePerson} />
    </div>
  );
}

export default App;
