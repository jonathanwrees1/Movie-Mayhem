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
    email: 'kimmyjones@yahoo.com',
  },
  {
    id: 2,
    name: 'Joe',
    favoriteMovies: ['Rogue One: A Star Wars Story'],
    dateOfBirth: 'October 11, 1992',
    email: 'joeyouknow23@gmail.com',
  },
  {
    id: 3,
    name: 'Mary',
    favoriteMovies: ['Episode 1: The Phantom Menace'],
    dateOfBirth: 'November 5, 1988',
    email: 'quitecontrary33@gmail.com',
  },
  {
    id: 4,
    name: 'Jackson',
    favoriteMovies: [],
    dateOfBirth: 'March 3, 1995',
    email: 'notmichael99@yahoo.com',
  },
];

let starWars = [
  {
    title: 'Episode 1: The Phantom Menace',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg',
    overview:
      'Anakin Skywalker, a young slave strong with the Force, is discovered on Tatooine by Jedis Qui-Gon Jinn and Obi-Wan Kenobi. Meanwhile, the evil Sith have returned, enacting their plot for revenge against the Jedi.',
    director: {
      name: 'George Lucas',
      bio: "George Walton Lucas Jr.[1] (born May 14, 1944) is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012.[2] Lucas is one of history's most financially successful filmmakers and has been nominated for four Academy Awards. His films are among the 100 highest-grossing movies at the North American box office, adjusted for ticket-price inflation.[3] Lucas is considered one of the most significant figures of the 20th-century New Hollywood movement, and a pioneer of the modern blockbuster.",
      birthYear: '1944',
      deathYear: '',
    },
    released: '5/19/1999',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 2: Attack Of The Clones',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg',
    overview:
      'Following an assassination attempt on Senator Padmé Amidala, Jedi Knights Anakin Skywalker and Obi-Wan Kenobi further investigate the true identity of the Sith, and discover a mysterious plan that was set in motion many years earlier. Anakin and Padme grow closer in their affection for eachother, even though attachment is forbidden for a Jedi',
    director: {
      name: 'George Lucas',
      bio: "George Walton Lucas Jr.[1] (born May 14, 1944) is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012.[2] Lucas is one of history's most financially successful filmmakers and has been nominated for four Academy Awards. His films are among the 100 highest-grossing movies at the North American box office, adjusted for ticket-price inflation.[3] Lucas is considered one of the most significant figures of the 20th-century New Hollywood movement, and a pioneer of the modern blockbuster.",
      birthYear: '1944',
      deathYear: '',
    },
    released: '05/16/2002 ',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 3: Revenge Of the Sith',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg',
    overview:
      "The evil Darth Sidious enacts his final plan for unlimited power. Once the Sith Lord's true identity is discovered, Anakin Skywalker is forced to choose a side.",
    director: {
      name: 'George Lucas',
      bio: "George Walton Lucas Jr.[1] (born May 14, 1944) is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012.[2] Lucas is one of history's most financially successful filmmakers and has been nominated for four Academy Awards. His films are among the 100 highest-grossing movies at the North American box office, adjusted for ticket-price inflation.[3] Lucas is considered one of the most significant figures of the 20th-century New Hollywood movement, and a pioneer of the modern blockbuster.",
      birthYear: '1944',
      deathYear: '',
    },
    released: '5/19/2005',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Rogue One: A Star Wars Story',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/i0yw1mFbB7sNGHCs7EXZPzFkdA1.jpg',
    overview:
      'Jyn Erso and a rogue band of resistance fighters unite for a mission against The Empire to steal the Death Star plans and bring hope to the galaxy.',
    director: {
      name: 'Gareth Edwards',
      bio: "Gareth James Edwards (born 13 July 1975) is a British visual effects artist, screenwriter, film director, cinematographer, production designer, and film producer. He first gained widespread recognition for Monsters (2010), an independent film in which he served as writer, director, cinematographer, and visual effects artist.[1][2] He subsequently directed Godzilla (2014), a reboot[3] of Toho's Godzilla franchise and the first film in Legendary's MonsterVerse, and Rogue One: A Star Wars Story (2016), the first installment of the Star Wars anthology series and an immediate prequel to Star Wars: Episode IV – A New Hope (1977).",
      birthYear: '1975',
      deathYear: '',
    },
    released: '12/16/2016',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 4: A New Hope',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/eFPSzaRX9K1tfUpmBxBuDGFjULs.jpg',
    overview:
      'Princess Leia Organa is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Luke Skywalker and captain Han Solo team together with the robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
    director: {
      name: 'George Lucas',
      bio: "George Walton Lucas Jr.[1] (born May 14, 1944) is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012.[2] Lucas is one of history's most financially successful filmmakers and has been nominated for four Academy Awards. His films are among the 100 highest-grossing movies at the North American box office, adjusted for ticket-price inflation.[3] Lucas is considered one of the most significant figures of the 20th-century New Hollywood movement, and a pioneer of the modern blockbuster.",
      birthYear: '1944',
      deathYear: '',
    },
    released: '05/25/1977',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 5: The Empire Strikes Back',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/7BuH8itoSrLExs2YZSsM01Qk2no.jpg',
    overview:
      'The saga continues as Luke Skywalker, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.',
    director: {
      name: 'Irvin Kershner',
      bio: "Irvin Kershner (born Isadore Kershner; April 29, 1923 – November 27, 2010) was an American director, actor, and producer of film and television. He gained notice early in his career as a filmmaker for directing quirky, independent drama films, while working as an influential lecturer at the University of Southern California. Later in his career, he transitioned to high-budget blockbusters such as The Empire Strikes Back, the James Bond adaptation Never Say Never Again, and RoboCop 2. Through the course of his career, he received numerous accolades, and was nominated for both a Primetime Emmy Award and a Palme d'Or.",
      birthYear: '1923',
      deathYear: '2010',
    },
    released: '6/20/1980',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 6: Return Of The Jedi',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/ydjp1K13GrnbiX0yjd398BI9xaC.jpg',
    overview:
      'Luke Skywalker leads a mission to rescue his friend Han Solo from the clutches of Jabba the Hutt, while the Emperor (aka: Darth Sidious) seeks to destroy the Rebellion once and for all with a second Death Star.',
    director: {
      name: 'George Lucas',
      bio: "George Walton Lucas Jr.[1] (born May 14, 1944) is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, Lucasfilm Games, and Industrial Light & Magic. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012.[2] Lucas is one of history's most financially successful filmmakers and has been nominated for four Academy Awards. His films are among the 100 highest-grossing movies at the North American box office, adjusted for ticket-price inflation.[3] Lucas is considered one of the most significant figures of the 20th-century New Hollywood movement, and a pioneer of the modern blockbuster.",
      birthYear: '1944',
      deathYear: '',
    },
    released: '5/25/1983',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 7: The Force Awakens',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg',
    overview:
      'Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of First Order Stormtroopers. This installment introduces us to a brand new, force-sensitive heroine, Rey.',
    director: {
      name: 'J.J Abrams',
      bio: ' Jeffrey Jacob Abrams (born June 27, 1966)[1] is an American filmmaker and composer. He is best known for his works in the genres of action, drama, and science fiction. Abrams wrote and produced such films as Regarding Henry (1991), Forever Young (1992), Armageddon (1998), Cloverfield (2008), Star Trek (2009), Star Wars: The Force Awakens (2015), and Star Wars: The Rise of Skywalker (2019). Abrams has created numerous television series, including Felicity (co-creator, 1998–2002), Alias (creator, 2001–2006), Lost (co-creator, 2004–2010), and Fringe (co-creator, 2008–2013). He won two Emmy Awards for Lost – Outstanding Directing for a Drama Series and Outstanding Drama Series. His directorial film work includes Mission: Impossible III (2006), Star Trek (2009), Super 8 (2011), and Star Trek Into Darkness (2013). He also directed, produced and co-wrote The Force Awakens, the seventh episode of the Star Wars saga and the first film of the sequel trilogy. The film is his highest-grossing, as well as the fourth-highest-grossing film of all time not adjusted for inflation. He returned to Star Wars by executive producing The Last Jedi (2017), and directing and co-writing The Rise of Skywalker (2019).[2]',
      birthYear: '1966',
      deathYear: '',
    },
    released: '12/18/2015',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 8: The Last Jedi',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    overview:
      'Rey strengthens her newly discovered abilities under the guidance of Luke Skywalker, who is very concerned about the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    director: {
      name: 'Rian Johnson',
      bio: 'Rian Craig Johnson (born December 17, 1973) is an American filmmaker. He made his directorial debut with the neo-noir mystery film Brick (2005), which received positive reviews and grossed nearly $4 million on a $450,000 budget. Transitioning to higher-profile films, Johnson achieved mainstream recognition for writing and directing the science-fiction thriller Looper (2012) to critical and commercial success. Johnson landed his largest project when he wrote and directed the space opera Star Wars: The Last Jedi (2017), which grossed over $1 billion. He returned to the mystery genre with Knives Out (2019), earning him an Academy Award nomination for Best Original Screenplay.',
      birthYear: '1973',
      deathYear: '',
    },
    released: '12/15/2017',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
        'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It has been called the "literature of ideas", and it often explores the potential consequences of scientific, social, and technological innovations.',
    },
  },
  {
    title: 'Episode 9: The Rise Of Skywalker',
    imageUrl:
      'https://www.themoviedb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg',
    overview:
      'The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. Jedi Rey learns the truth about her forgotten past, and must come to terms with who she wants to be.',
    director: {
      name: 'J.J. Abrams',
      bio: 'Jeffrey Jacob Abrams (born June 27, 1966)[1] is an American filmmaker and composer. He is best known for his works in the genres of action, drama, and science fiction. Abrams wrote and produced such films as Regarding Henry (1991), Forever Young (1992), Armageddon (1998), Cloverfield (2008), Star Trek (2009), Star Wars: The Force Awakens (2015), and Star Wars: The Rise of Skywalker (2019). Abrams has created numerous television series, including Felicity (co-creator, 1998–2002), Alias (creator, 2001–2006), Lost (co-creator, 2004–2010), and Fringe (co-creator, 2008–2013). He won two Emmy Awards for Lost – Outstanding Directing for a Drama Series and Outstanding Drama Series. His directorial film work includes Mission: Impossible III (2006), Star Trek (2009), Super 8 (2011), and Star Trek Into Darkness (2013). He also directed, produced and co-wrote The Force Awakens, the seventh episode of the Star Wars saga and the first film of the sequel trilogy. The film is his highest-grossing, as well as the fourth-highest-grossing film of all time not adjusted for inflation. He returned to Star Wars by executive producing The Last Jedi (2017), and directing and co-writing The Rise of Skywalker (2019).[2]',
      birthYear: '1966',
      deathYear: '',
    },
    released: '12/20/2019',
    isFeatured: 'true',
    genre: {
      name: 'Sci-Fi',
      description:
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
