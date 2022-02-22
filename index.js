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
    dateOfBirth: 'January 15, 2001',
    userName: 'kimmy15',
    email: 'kimmyjones@yahoo.com',
  },
  {
    id: 2,
    name: 'Joe',
    favoriteMovies: ['Rogue One: A Star Wars Story'],
    dateOfBirth: 'October 11, 1992',
    userName: 'joe2392',
    email: 'joeyouknow23@gmail.com',
  },
  {
    id: 3,
    name: 'Mary',
    favoriteMovies: ['Episode 1: The Phantom Menace'],
    dateOfBirth: 'November 5, 1988',
    userName: 'mary33hh',
    email: 'quitecontrary33@gmail.com',
  },
  {
    id: 4,
    name: 'Jackson',
    favoriteMovies: [],
    dateOfBirth: 'March 3, 1995',
    userName: 'jackson49',
    email: 'notmichael99@yahoo.com',
  },
];

let starWars = [
  {
    Title: 'Star Wars Episode 1: The Phantom Menace',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg',
    Released: '5/19/1999',
    Description:
      'Anakin Skywalker, a young slave strong with the Force, is discovered on Tatooine by Jedis Qui-Gon Jinn and Obi-Wan Kenobi. Meanwhile, the evil Sith have returned, enacting their plot for revenge against the Jedi.',
    Director: {
      Name: 'George Lucas',
      Bio: 'George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012',
      BirthYear: '1944',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Sci-Fi',
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    Title: 'The Fox and The Hound',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/aC3k6XBaYnulGSkK8263ABjU3Md.jpg',
    Released: '07/10/1981',
    Description:
      'When a little fox named Todd is adopted into a farm family, he quickly becomes friends with a puppy named Copper. Life is full of adventures until Copper is expected to take on his role as a fox- hunting dog',
    Director: {
      Name: 'Ted Berman',
      Bio: 'American film director, animator, and screenwriter, known for his work with Disney, including Bambi, Fantasia, and The Black Cauldron.',
      BirthYear: '1919',
      DeathYear: '2001',
    },
    Featured: 'True',
    Genre: {
      Name: 'Animated',
      Description:
        'Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.',
    },
  },
  {
    Title: 'Star Wars Episode 3: Revenge Of the Sith',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg',
    Released: '5/19/2005',
    Description:
      "The evil Darth Sidious enacts his final plan for unlimited power. Once the Sith Lord's true identity is discovered, Anakin Skywalker is forced to choose a side.",
    Director: {
      Name: 'George Lucas',
      Bio: 'George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012',
      BirthYear: '1944',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Sci-Fi',
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    Title: 'Rogue One: A Star Wars Story',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/i0yw1mFbB7sNGHCs7EXZPzFkdA1.jpg',
    Released: '12/16/2016',
    Description:
      'Jyn Erso and a rogue band of resistance fighters unite for a mission against The Empire to steal the Death Star plans and bring hope to the galaxy.',
    Director: {
      Name: 'Gareth Edwards',
      Bio: 'Gareth James Edwards is a British visual effects artist, screenwriter, film director, cinematographer, production designer, and film producer.',
      BirthYear: '1975',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Sci-Fi',
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    Title: 'Star Wars Episode 4: A New Hope',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/eFPSzaRX9K1tfUpmBxBuDGFjULs.jpg',
    Released: '05/25/1977',
    Description:
      'Princess Leia Organa is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Luke Skywalker and captain Han Solo team together with the robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
    Director: {
      Name: 'George Lucas',
      Bio: 'George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012',
      BirthYear: '1944',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Sci-Fi',
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    Title: 'Blue Streak',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/jek2osBtFhzU6Hjj7yp1egOtbqO.jpg',
    Released: '05/25/1977',
    Description:
      'Miles Logan is a jewel thief who stole a huge diamond. However, after two years in jail, he comes to find out that he stashed the diamond in a police building that was under construction at the time of the robbery. In an attempt to regain his diamond, he pretends to be a big time LAPD detective.',
    Director: {
      Name: 'Les Mayfield',
      Bio: 'American film director and producer.Mayfield made his feature-film debut in 1992 with the comedy Encino Man starring Pauly Shore and Brendan Fraser. It was followed by Miracle on 34th Street, starring Richard Attenborough, in 1994, and Flubber, starring Robin Williams, in 1997. He directed the Martin Lawrence comedy Blue Streak in 1999.',
      BirthYear: '1959',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Comedy',
      Description:
        'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement.',
    },
  },

  {
    Title: 'Mission: Impossible 3',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/5l0hS4A119jCA1A02XsFZHq1uRD.jpg',
    Released: '05/05/2006',
    Description:
      'Retired from active duty, Ethan Hunt is called back into action to confront arms dealer, Owen Davian. Ethan must try to protect his girlfriend while working with his new team to complete their mission.',
    Director: {
      Name: 'J.J. Abrams',
      Bio: ' Jeffrey Jacob Abrams is an American filmmaker and composer. He is most famous for his works in the genres of action, drama, and science fiction.',
      BirthYear: '1966',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Action',
      Description:
        'The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.',
    },
  },
  {
    Title: 'Star Wars Episode 7: The Force Awakens',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg',
    Released: '12/18/2015',
    Description:
      'Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of First Order Stormtroopers. This installment introduces us to a brand new, force-sensitive heroine, Rey.',
    Director: {
      Name: 'J.J. Abrams',
      Bio: ' Jeffrey Jacob Abrams is an American filmmaker and composer. He is most famous for his works in the genres of action, drama, and science fiction.',
      BirthYear: '1966',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Sci-Fi',
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    Title: 'Star Wars Episode 8: The Last Jedi',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    Released: '12/15/2017',
    Description:
      'Rey strengthens her newly discovered abilities under the guidance of Luke Skywalker, who is very concerned about the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    Director: {
      Name: 'Rian Johnson',
      Bio: 'Rian Craig Johnson is an American filmmaker. He made his directorial debut with the neo-noir mystery film Brick (2005), which received positive reviews and grossed nearly $4 million on a $450,000 budget. Johnson landed his largest project when he wrote and directed the space opera Star Wars: The Last Jedi (2017).',
      BirthYear: '1973',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Sci-Fi',
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    Title: 'Star Wars Episode 9: The Rise Of Skywalker',
    ImageUrl:
      'https://www.themoviedb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg',
    Released: '12/20/2019',
    Description:
      'The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. Jedi Rey learns the truth about her forgotten past, and must come to terms with who she wants to be.',
    Director: {
      Name: 'J.J. Abrams',
      Bio: ' Jeffrey Jacob Abrams is an American filmmaker and composer. He is most famous for his works in the genres of action, drama, and science fiction.',
      BirthYear: '1966',
      DeathYear: '',
    },

    Featured: 'True',
    Genre: {
      Name: 'Sci-Fi',
      Description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
];
//Middleware:Morgan Logging Package
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
    user.userName = updatedUser.userName;
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
