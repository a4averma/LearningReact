const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

//routes
app.use('/api/user', users);
app.use('/api/profile', profiles);
app.use('/api/post', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on PORT: ${port}`));
