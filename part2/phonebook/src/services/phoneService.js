import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const remove = (id) => {
  const url = `${baseUrl}/${id}`;
  return axios.delete(url);
};

const update = (id, person) => {
  const url = `${baseUrl}/${id}`;
  return axios.put(url, person).then((response) => response.data);
};

const personInServer = (newPerson) =>
  getAll().then((persons) =>
    persons.find((person) => person.name === newPerson.name)
  );

export default { getAll, addPerson, remove, update, personInServer };
