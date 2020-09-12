const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
require("dotenv").config();

const url = process.env.MONGODB_URL;

console.log(`connecting to ${url}`);

mongoose
  .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB", err.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

personSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
