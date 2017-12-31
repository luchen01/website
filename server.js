const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');
const bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());

passport.serializeUser((user, done)=>{
    done(null, user._id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=> {
        done(err, user);
    });
});

passport.use(new LocalStrategy((username, password, done)=> {
    User.findOne({ username: username }, (err, user)=>{
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
    });
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./backend/models').User;
const Document = require('./backend/models').Document;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

app.use(session({
    secret: 'secret sauce',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

console.log("in api");

app.use('/', api);

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
