const expect = require('expect');
const request = require('supertest');
// const {ObjectID} = require('mongodb');

// const {app} = require('./../server');
// const {Todo} = require('./../models/todo');

var ObjectID = require('mongodb').ObjectID;
const app = require('./../server').app;
const Todo = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    // return Todo.insertMany(todos);
    Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    console.log('-----------------');
    console.log({text});//{ text: 'Test todo text' }
    console.log('-----------------');

    request(app)
      .post('/todos')
      .send({text})
      //傳出去的{text}
      //為{ text: 'Test todo text' }
      //並傳入server.js
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          //此時資料庫有三筆資料
          console.log('--------todos---------');
          console.log(todos);
          console.log('--------todos---------');

          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          //此時只有const todos[]中的兩筆資料
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    //檢測url
    console.log('--------todos url---------');
    console.log(`/todos/${todos[0]._id}`);
    console.log(`/todos/${todos[0]._id.toHexString()}`);
    console.log('--------todos url---------');
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        //檢測res
        console.log('--------/todos/:id todos---------');
        // console.log(res);
        console.log(res.body.todo);
        console.log(res.body.todo.text);
        console.log('--------/todos/:id todos---------');
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});
