const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

const { check, validationResult } = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*mongoose.connect('mongodb://localhost:27017/movietime_mayhem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

const cors = require('cors');
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn't allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

//Middleware:Morgan Logging Package
app.use(morgan('common'));

//Homepage
app.get('/', (req, res) => {
  res.send('Welcome To Movie Time Mayhem!');
});

//CREATE new user
app.post(
  '/users', //Validation logic
  [
    check('UserName', 'UserName is required').isLength({ min: 5 }),
    check(
      'UserName',
      'UserName contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOne({ UserName: req.body.UserName })
      // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.UserName + ' already exists');
        } else {
          Users.create({
            UserName: req.body.UserName,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

//READ Get all users
/*app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});*/

//READ Get all movies
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//READ Get a movie by title
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        if (movie) {
          res.json(movie);
        } else {
          res.status(400).send('Could not find that one!');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//READ Get a Genre description by genre name
app.get(
  '/movies/genre/:Name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name })
      .then((movie) => {
        if (movie) {
          res.json(movie.Genre);
        } else {
          res.status(400).send('Could not find that one!');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//READ Get Director Info by Director name
app.get(
  '/movies/director/:Name',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name })
      .then((movie) => {
        if (movie) {
          res.json(movie.Director);
        } else {
          res.status(400).send('Could not find that one!');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//READ Get a user by username
/*app.get('/users/:UserName', (req, res) => {
  Users.findOne({ UserName: req.params.UserName })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});*/

//UPDATE User Info by username

app.put(
  '/users/:UserName',
  [
    check('UserName', 'UserName is required').isLength({ min: 5 }),
    check(
      'UserName',
      'UserName contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],

  //Checking JWT
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { UserName: req.params.UserName },
      {
        $set: {
          UserName: req.body.UserName,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, //this line makes sure that the doc is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Update Add Movies to profile
app.post(
  '/users/:UserName/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { UserName: req.params.UserName },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//DELETE Movies from favorite movies list
app.delete(
  '/users/:UserName/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { UserName: req.params.UserName },
      {
        $pull: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//DELETE User by UserName
app.delete(
  '/users/:UserName',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ UserName: req.params.UserName })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.UserName + ' was not found.');
        } else {
          res.status(200).send(req.params.UserName + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

/*/DELETE Movies from profile
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('no such user');
  }
});*/

/*
//READ Return a list of all movies
app.get('/movies', (req, res) => {
  res.status(200).json(starWars);
});

//READ Search for movie based on title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = starWars.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie');
  }
});

//READ Return Genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = starWars.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre');
  }
});

//READ Return Director name
app.get('/movies/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = starWars.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director');
  }
});*/

//Middleware:Routes static page requests to public folder
app.use(express.static('public'));
//Middleware:Error throwing
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Uh Oh. That didn't go as planned!");
});
// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
