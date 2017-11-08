const MongoClient = require('mongodb').MongoClient;
// const {MongoClient, ObjectID} = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/todoapp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //test 1.
  db.collection('todos').find({
    // "completed" : false
    _id: new ObjectID('586b4132d1d01f38cf0da8ea')
    // "_id" : new ObjectId("586b4132d1d01f38cf0da8ea") //ObjectId is not defined
  }).toArray().then((docs) => {
    //if not toArray()
    //TypeError: db.collection(...).find(...).then is not a function
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  //test 2.
  //計算共幾筆資料
  db.collection('todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  //test 3.
  db.collection('todos').find({name: 'Andrew'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });

  // db.close();
});
