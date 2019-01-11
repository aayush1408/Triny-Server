const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const EventEmitter = require('events');
const DataModel = require('./models/dataModel');

const app = express();
const myEmitter = new EventEmitter();


app.use(cors());


const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
const mongoUrl = process.env.mongoUrl || `mongodb://localhost/testhooks`;
mongoose.connect(mongoUrl);

mongoose.connection.once('open', () => {
  console.log('Connection has been made');
})
  .on('error', (error) => {
    console.log(error);
  });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/send-details', (req, res) => {
  const data = req.body;
  const { parameters } = data.result;
  const newData = new DataModel(parameters);
  newData.save().then(() => {
    res.status(200).send('Success');
    myEmitter.emit('data stored');
  });
});


app.get('/get-data', (req, res) => {
  DataModel.find({}).then((data) => {
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});