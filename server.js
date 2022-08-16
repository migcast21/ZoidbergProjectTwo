//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config()
const Coffee = require('./models/schema.js');
const drinks = require('./models/coffee.js');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));


// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

//seed route
app.get('/drinks/seed', (req, res) => {
  Coffee.create(drinks,(err,data) => {
    res.redirect('/drinks');
  });
});

//delete route
app.delete('/drinks/:id', (req, res)=>{
  Coffee.findByIdAndDelete(req.params.id, (error, removedCoffee) => {
    res.redirect('/drinks');
  });
});

//edit route
app.get('/drinks/:id/edit', (req, res)=>{
  Coffee.findById(req.params.id, (error, foundCoffee)=>{ 
      res.render(
      'edit.ejs',
      {
        coffee: foundCoffee 
      }
    );
  });
});

app.put('/drinks/:id', (req, res)=>{
  Coffee.findByIdAndUpdate(req.params.id,req.body,{new:true}, (error, updatedCoffee) => {
    res.redirect('/drinks');
    // res.send(req.body);
  });
});

//index route
app.get('/drinks', (req, res) => {
  Coffee.find({}, (error, allCoffee) => {
    res.render('index.ejs', {
      coffee: allCoffee
    });
  });
});

//create route
app.get('/drinks/new', (req, res)=>{
  res.render('new.ejs');
});

app.post('/drinks/', (req, res)=>{
  // res.send(req.body);
  Coffee.create(req.body, (error, createdCoffee) => {
    res.redirect('/drinks');
  });
});

//show route
app.get('/drinks/:id', (req, res)=>{
  Coffee.findById(req.params.id, (error, foundCoffee)=>{
      res.render('show.ejs', {
        coffee: foundCoffee
      });
  });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));