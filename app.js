const express = require('express');
const app = express();
const {usersRouter, ensureAuthenticated} = require('./routes/users');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { lessonsRouter } = require('./routes/lessons');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Thank you for visiting the site. Login with Google at /auth/google in order to access the content. \nAfter you are done, you can logout at /logout'));

app.get('/auth/google', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    next();
    },
    passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/'); 
    }
  );

  app.get('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/');
    });
  });




app.use(cors());  
app.use(express.json());


app.use('/api-docs', ensureAuthenticated, swaggerUi.serve, swaggerUi.setup(swaggerFile));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

const PORT = process.env.PORT || 5000


app.use(usersRouter);
app.use(lessonsRouter);
app.use(async (req, res, next) => {
    next({status: 404, message: 'Sorry, the page cannot be found'});
});

app.use((err, req, res, send) => {
    if (err.status === 404) {
        res.status(404).send(err.message);
    } else {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


