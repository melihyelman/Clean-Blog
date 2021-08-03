const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');
const moment = require('moment');

const {
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} = require('./controllers/postControllers');

const {
  getAboutPage,
  getAddPostPage,
  getEditPage,
} = require('./controllers/pageControllers');

const app = express();

//connect db

mongoose.connect('mongodb://localhost/cleanblog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

//ROUTES
app.get('/', getAllPosts);

app.get('/posts/:id', getPost);

app.get('/about', getAboutPage);

app.get('/add-post', getAddPostPage);

app.get('/post/edit/:id', getEditPage);

app.post('/posts', addPost);

app.put('/post/edit/:id', updatePost);

app.delete('/post/delete/:id', deletePost);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
