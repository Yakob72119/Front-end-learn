const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'you forget to insert name']
    },
    rating: {
        type: Number,
        min:1,
        max:10
    },
    review: String
});

const Fruit=mongoose.model("Fruit", fruitSchema);

const fruit=new Fruit ({
    name : "apple",
    rating : 7,
    review: "pretty solid as a fruit"
})
//fruit.save();
const pineapple=new Fruit({
    name: "pineapple",
    rating: 9,
    review: "oww delicious"
})
pineapple.save();
const personSchema=new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})

const Person=new mongoose.model("person", personSchema);

const person= new Person({
    name: "yakob",
    age: 23,
    favouriteFruit: pineapple
});
person.save();

// const Kiwi=new Fruit({
//     name: "kiwi",
//     score: 10,
//     review: "the best fruit me"
// });
// const banana=new Fruit({
//     name: "bananai",
//     score: 1,
//     review: "the best fruit me"
// });
// const orange=new Fruit({
//     name: "orange",
//     score: 5,
//     review: "the best fruit me"
// })
// Fruit.insertMany([Kiwi,banana,orange]);



//to fetch data
async function fetchAllDocuments() {
    try {
      // Using promises
      const fruits = await Fruit.find({}).exec();
      fruits.forEach((fruits)=>{
        console.log(fruits.name);
        console.log(fruits.review);
      })
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  }
  
  // Call the function
fetchAllDocuments();
 

  //to fetch data
  async function updateFruit() {
    try {
      // Update a single document
      const result = await Fruit.updateOne(
        { name: 'apple' }, // Specify the document to update
        { $set: { review: 'goog' } } // Update the 'color' field to 'Red'
      );
  
      console.log(result);
  
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }
  }
  
  // Call the function
  updateFruit();


  //to delete a value

  async function deleteFruit() {
    try {
      // Delete a single document
      const result = await Fruit.deleteOne({ name: 'Apple' });
  
      console.log(result);

    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the function
  deleteFruit();


  // this is good practice 
//   mongoose.connection.close();