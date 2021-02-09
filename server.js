const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fruitsController = require('./controllers/fruits.js');
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;
const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/basiccrud';

//... and then farther down the file
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use('/fruits', fruitsController);

app.listen(port, () => {
    console.log('listening');
});