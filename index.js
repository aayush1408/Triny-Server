const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Express instance
const app = express();

//Handle cors
app.use(cors());

//Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.userid) {
    res.clearCookie('user_sid');
  }
  next();
});

// Mongoose configurations
mongoose.Promise = global.Promise;
const mongoUrl = process.env.mongoUrl || `mongodb://localhost/testhooks`;

// Mongodb connection
mongoose.connect(mongoUrl);
mongoose.connection.once('open', () => {
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

// Middleware route handler
app.use('/', hookRoute);
app.use('/', dashboardRoute);
app.use('/', loginRoute);
app.use('/', logoutRoute);
app.use('/user', userRoute);

//Port
const PORT = process.env.PORT || 5000;

//Setting up the server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});