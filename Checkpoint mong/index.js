var express = require('express');
var app = express();
var mongoose = require('mongoose');
var PersonModel = require('./schema');

// Corrected the MongoDB connection string to remove deprecated options
var db = 'mongodb://127.0.0.1:27017/Person';
mongoose.connect(db)
.then(() => {
    console.log('Database connection successful');
})
.catch(err => {
    console.error('Database connection error', err);
});

var port = 8080;
app.listen(port, () => {
    console.log('App listen on port ' + port);
});

//2) Create and Save a Record 
// Using async/await for better error handling
async function createAndSavePerson() {
  let person = new PersonModel({
    name: 'hajer',
    age: 25,
    favoriteFoods: ['Pizza', 'burger', 'Sushi']
  });

  try {
    let savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error(err);
  }
}
createAndSavePerson();

//3) Create Many Records with model.create()
// It's good practice to handle creation in an async function as well
async function createManyPeople() {
  let people = [
    {
        name: 'amine',
        age: 26,
        favoriteFoods: ['PASTA', 'PIZZA', 'ma9loub']
    },
    // ... other people
  ];

  try {
    let createdPeople = await PersonModel.create(people);
    console.log('People created:', createdPeople);
  } catch (err) {
    console.error(err);
  }
}
createManyPeople();

// The rest of your CRUD operations should also be inside async functions
// and should not use the deprecated callback style. Instead, use async/await or
// promise chaining with .then() and .catch().

//4) Use model.find():
async function searchName(name) {
  try {
    let foundPeople = await PersonModel.find({ name: name });
    console.log('Found people:', foundPeople);
  } catch (err) {
    console.error(err);
  }
}

//5) Use model.findOne() to Return a Single Matching Document from Your Database:
async function searchFood(food) {
  try {
    let foundPerson = await PersonModel.findOne({ favoriteFoods: food });
    console.log('Found person:', foundPerson);
  } catch (err) {
    console.error(err);
  }
}

//7) Find, Edit, then Save:
async function searchAndSave(Id) {
  try {
    let person = await PersonModel.findById(Id);
    person.favoriteFoods.push('pasta');
    let savedPerson = await person.save();
    console.log('Updated person:', savedPerson);
  } catch (err) {
    console.error(err);
  }
}

//8) Perform New Updates on a Document Using model.findOneAndUpdate():
async function searchAndSaveOne(name) {
  try {
    let updatedPerson = await PersonModel.findOneAndUpdate(
      { name: name },
      { age: 20 },
      { new: true }
    );
    console.log('Updated person:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
}

//9) Delete One Document Using model.findByIdAndRemove:
async function deleteById(Id) {
  try {
    let deletedPerson = await PersonModel.findByIdAndRemove(Id);
    console.log('Deleted person:', deletedPerson);
  } catch (err) {
    console.error(err);
  }
}

//10) MongoDB and Mongoose - Delete Many Documents with model.remove():
async function deleteManyPersons(name) {
  try {
    let result = await PersonModel.deleteMany({ name: name });
    console.log(`${result.deletedCount} documents were deleted.`);
  } catch (err) {
    console.error(err);
  }
}

//11) Chain Search Query Helpers to Narrow Search Results:
async function chainSearch(foodToSearch) {
  try {
    let results = await PersonModel.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec();
    console.log('Chained search results:', results);
  } catch (err) {
    console.error(err);
  }
}
