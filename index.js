const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: 'Kim',
    favoriteMovies: [],
  },
  {
    id: 2,
    name: 'Joe',
    favoriteMovies: ['Rogue One: A Star Wars Story'],
  },
];

let starWars = [
  {
    title: 'Episode 1: The Phantom Menace',
    director: {
      name: 'George Lucas',
    },
    released: '1999',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 2: Attack Of The Clones',
    director: {
      name: 'George Lucas',
    },
    released: '2002',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 3: Revenge Of the Sith',
    director: {
      name: 'George Lucas',
    },
    released: '2005',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Rogue One: A Star Wars Story',
    director: {
      name: 'Gareth Edwards',
    },
    released: '2016',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 4: A New Hope',
    director: {
      name: 'George Lucas',
    },
    released: '1977',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 5: The Empire Strikes Back',
    director: {
      name: 'Irvine Kershner',
    },
    released: '1980',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 6: Return Of The Jedi',
    director: {
      name: 'George Lucas',
    },
    released: '1983',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 7: The Force Awakens',
    director: {
      name: 'J.J Abrams',
    },
    released: '2015',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 8: The Last Jedi',
    director: {
      name: 'Rian Johnson',
    },
    released: '2017',
    genre: {
      name: 'Sci-Fi',
    },
  },
  {
    title: 'Episode 9: The Rise Of Skywalker',
    director: {
      name: 'J.J. Abrams',
    },
    released: '2019',
    genre: {
      name: 'Sci-Fi',
    },
  },
];

//Middleware:Morga Logging Package
app.use(morgan('common'));

//CREATE new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('users need names');
  }
});

//UPDATE User Info
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user');
  }
});

//CREATE Add Movies to profile
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('no such user');
  }
});

//DELETE Movies from profile
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
});

//DELETE User profile
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('no such user');
  }
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome To Movie Mayhem!');
});

//READ Return a list of all movies
app.get('/movies', (req, res) => {
  res.status(200).json(starWars);
});

//READ Search for movie based on title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = starWars.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie');
  }
});

//READ Return Genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = starWars.find((movie) => movie.genre.name === genreName).genre;

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
    (movie) => movie.director.name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director');
  }
});

//Middleware:Routes static page requests to public folder
app.use(express.static('public'));
//Middleware:Error throwing
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Uh Oh. That didn't go as planned!");
});
// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
