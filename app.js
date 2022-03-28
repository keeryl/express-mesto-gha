const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  req.user = {
    _id: '61d86492985c4b21b16751a5',
  };
  next();
});
app.use(bodyParser.json());
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрошенный роут не существует' });
});

app.listen(PORT);
