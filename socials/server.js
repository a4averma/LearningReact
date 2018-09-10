import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

// IMPORTS, CONFIGS, AND INITS.

// Express
const app = express();

// Routes
import users from './routes/api/users';
import profiles from './routes/api/profiles';
import posts from './routes/api/posts';

// DB Config and Connection
import { mongoURI } from './config/keys';
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport Config
require('./config/passport')(passport);

// MIDDLWARES
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())




// Routes Middleware
app.use('/api/user', users);
app.use('/api/profile', profiles);
app.use('/api/post', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on PORT: ${port}`));
