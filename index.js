const express = require('express'),
  morgan = require('morgan');

const app = express();

let starWars = [
  {
    title: 'Episode 1: The Phantom Menace',
    director: 'George Lucas',
    released: '1999',
  },
  {
    title: 'Episode 2: Attack Of The Clones',
    director: 'George Lucas',
    released: '2002',
  },
  {
    title: 'Episode 3: Revenge Of the Sith',
    director: 'George Lucas',
    released: '2005',
  },
  {
    title: 'Rogue One: A Star Wars Story',
    director: 'Gareth Edwards',
    released: '2016',
  },
  {
    title: 'Episode 4: A New Hope',
    director: 'George Lucas',
    released: '1977',
  },
  {
    title: 'Episode 5: The Empire Strikes Back',
    director: 'Irvine Kershner',
    released: '1980',
  },
  {
    title: 'Episode 6: Return Of The Jedi',
    director: 'George Lucas',
    released: '1983',
  },
  {
    title: 'Episode 7: The Force Awakens',
    director: 'J.J. Abrams',
    released: '2015',
  },
  {
    title: 'Episode 8: The Last Jedi',
    director: 'Rian Johnson',
    released: '2017',
  },
  {
    title: 'Episode 9: The Rise Of Skywalker',
    director: 'J.J. Abrams',
    released: '2019',
  },
];

//Middleware:Morga Logging Package
app.use(morgan('common'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome To Movie Mayhem!');
});

app.get('/movies', (req, res) => {
  res.json(starWars);
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
