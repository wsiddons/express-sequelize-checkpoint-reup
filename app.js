const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.
const { reset, listPeople, add, list, complete, remove } = require('./models/express-models/todos')


// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

app.use(express.json())

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});

app.get('/users', (req, res, next) => {
  //res.json(req.body)
  res.send(listPeople())
})

app.get('/users/:name/tasks', (req, res, next) => {
  //gets all tasks at param.name
  let name = req.params.name

  if (list(name) == undefined) {
    res.status(404).send('name not found')
  } else {
    res.send(list(name))
  }

})

app.post('/users/:name/tasks', (req, res, next) => {
  let name = req.params.name
  let task = req.body
  add(name, task)

  if (task.content.length === 0) {
    res.status(400).send('no content')
  }
  res.status(201).send(list(name)[list(name).length - 1])
})

app.put('/users/:name/tasks/:index', (req, res, next) => {
  let name = req.params.name
  let idx = req.params.index
  let task = req.body
  add(name, task)
  let listArr = list(name)
  res.status(200).send(listArr[idx].complete = true)
})

app.delete('/users/:name/tasks/:index', (req, res, next) => {
  let name = req.params.name
  let idx = req.params.index
  let listArr = list(name)
  listArr.splice(idx, 1)
  res.status(204).send(listArr)
})




if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
