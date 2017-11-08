const MongoClient = require('mongodb').MongoClient;
// const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //1.
  // deleteMany
  // db.collection('Todos').deleteMany({"completed" : false}).then((result) => {
  //   console.log(result.result);
  // });

  //2.
  // deleteOne
  db.collection('Todos').deleteOne({"completed" : true}).then((result) => {
    console.log(result);
  });
 
  //3.
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Andrew'});

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID("57ac8d47878a299e5dc21bc8")
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });

  // db.close();
});
