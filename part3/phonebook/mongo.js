const mongoose = require("mongoose");

console.log(process.argv);
if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@phonebook.7pgnz.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Person = mongoose.model(
  "Person",
  new mongoose.Schema({
    number: Number,
    name: String,
  })
);

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((result) => {
    console.log(`Add ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook: ");
    result.forEach((p) => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
  });
}
