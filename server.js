require("dotenv").config();
const express = require("express");
const session = require("express-session");
const compression = require("compression");

const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");

const MongoDBStore = require("connect-mongodb-session")(session);

const PORT = process.env.PORT || 3001;
const app = express();

const server = require("http").createServer(app);

// Define Session Store
const DB_ALT_CONNECTION = "mongodb://localhost/my-minifigs";

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || DB_ALT_CONNECTION,
  collection: 'sessions'
});

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

// Use session
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
});
app.use(sessionMiddleware);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Add passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// define strategy and use it
const configurePassport = require('./middleware/passportConf');
configurePassport(passport);

// Connect to the Mongo DB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI || DB_ALT_CONNECTION)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Add routes, both API and view
app.use(routes);

// Serve up static assets
app.use(express.static(__dirname + "/static"));
app.get("/static/preview/", function (request, response) {
  response.sendFile(path.join(__dirname + "/static/og-thumb.png"));
});

// If no API routes are hit, send the front end app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/dist/"));
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname + "/client/dist/index.html"));
  });
} else {
  const proxy = require("express-http-proxy");
  app.use("/", proxy("localhost:4200"));
}

// Add routes, both API and view
app.use(routes);

server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
})