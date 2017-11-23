const expect = require('expect');
const request = require('supertest');

// const {app} = require('./../server');
// const {Todo} = require('./../models/todo');

const app = require('./../server').app;
console.log('--------------server.js--------------');
console.log(app);
console.log('--------------server.js--------------');
// const app = require('./../server');
const Todo = require('./../models/todo');

const todos = [{
  text: 'First test todo'
}, {
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

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {

          console.log('----------------------------');
          console.log({text});
          console.log('----------------------------');

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
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')//此時就已經send了?
          //錯，是對應到server.js file，app.get時將資料(res.send({todos}))傳出
          //或許是對的！此時同步將req傳到server.js，得到資料後傳會繼續test
      .expect(200)
      .expect((res) => {

        console.log('----------------------------');
        console.log(res.body.todos);
        console.log('----------------------------');

        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
