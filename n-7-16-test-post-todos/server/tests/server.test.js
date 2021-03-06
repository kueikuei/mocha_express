const expect = require('expect');
const request = require('supertest');

const app = require('./../server').app;
// const app = require('./../server');
const Todo = require('./../models/todo');

// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

describe('POST /todos', () => {

  //beforeEach一定會在it之前再度執行裡頭程式
  //此處是確保DB裡頭的資料為空的w
  beforeEach((done) => {
    Todo.remove({}).then(() => done());
  });


  it('should create a new todo', (done) => {
    // var data = {
    //   'text':'Test todo text'
    // };

    var text = 'Test todo text';

    request(app)
      //UintTest for Data
      .post('/todos')
      // .send({text})//var text = 'Test todo text';
      .send({text:'Test todo text'})
      .expect((res) => {
        // console.log({text});
        // console.log(res.body.text);//Test todo text
        // toBe用來檢查物件
        expect(res.body.text).toBe(text);
        // expect(res.body).toInclude({text:'Test todo text'});
        // expect(res.body.text).to.equal('Test todo text');
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        //UintTest for DB
        Todo.find().then((todos) => {
          // console.log(todos);
          // console.log(todos[0].text);
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
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
