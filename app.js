const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрошенный роут не существует' });
});
app.use(errorHandler);

app.listen(PORT);
