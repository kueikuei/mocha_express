const MongoClient = require('mongodb').MongoClient;
// require('./ES6.js');
// const {MongoClient, ObjectID} = require('mongodb');

// const Mongo = require('mongodb');

// var obj = Mongo.ObjectID();
// var obj = new ObjectID();
// console.log(obj);

// const obj = {name:'Jason',age:23};
// const {name} = obj;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/todo', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Insert test2',
  //   completed: true
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  db.collection('Users').insertOne({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }
  
    console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});
