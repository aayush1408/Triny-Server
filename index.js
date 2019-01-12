const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

//Express instance
const app = express();

//Handle cors
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

//Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Mongoose configurations
mongoose.Promise = global.Promise;
const mongoUrl = process.env.mongoUrl || `mongodb://localhost/testhooks`;

// Mongodb connection
mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connection has been made');
}).on('error', (error) => {
  console.log(error);
});

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  secret: 'somerandonstuffs',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


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


//Port
const PORT = process.env.PORT || 5000;

//Setting up the server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});