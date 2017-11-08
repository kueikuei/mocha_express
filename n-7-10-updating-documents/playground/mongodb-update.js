const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  /*
    findOneAndUpdate(filter,update,options,callback)
  */

  //test 1.
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('59ec320b05a4b74e3bdff8c1')
  }, {
    $set: {
      age : 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //test 2.
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('59ec320b05a4b74e3bdff8c1')
  }, {
    $inc: {
      age: 77
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
