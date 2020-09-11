import React, { useState } from "react";

const PersonForm = ({ onAddPerson }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPerson({
      name,
      number,
    });
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="number">number</label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <input type="submit" value="add" />
    </form>
  );
};

export default PersonForm;
