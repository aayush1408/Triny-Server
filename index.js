const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const path = require("path");
//Express instance
const app = express();

// Mongoose configurations
mongoose.Promise = global.Promise;
const mongoUrl = process.env.mongoUrl || `mongodb://localhost/testhooks`;

//  Mongooose connection
mongoose.connect(mongoUrl);
const db = mongoose.connection;

//Handle cors
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://triny-dashboard.surge.sh'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  secret: 'somerandonstuffs',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: new MongoStore({
    mongooseConnection: db,
  })
}));

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Mongodb connection
db.once('open', () => {
  console.log('Connection has been made');
}).on('error', (error) => {
  console.log(error);
});


//Handle routes
const hookRoute = require('./routes/webhook');
const dashboardRoute = require('./routes/dashboard');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const userRoute = require('./routes/user');
const currentUserRoute = require('./routes/currentUser');


// Middleware route handler
app.use('/', hookRoute);
app.use('/', dashboardRoute);
app.use('/', loginRoute);
app.use('/', logoutRoute);
app.use('/user', userRoute);
app.use('/user', currentUserRoute);

app.get('/*', function (req, res) {
  console.log(path.join(__dirname, '../dashboard/public/index.html'));
  res.sendFile(path.join(__dirname, '../dashboard/public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

//Port
const PORT = process.env.PORT || 5000;

//Setting up the server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});