const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { getCords } = require('./utils/geocode');
const { forecast } = require('./utils/forcast');

const app = express();

// Defined paths express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Greg Munker',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Greg Munker',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is an example message',
    name: 'Greg Munker',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address found, please provide an address.',
    });
  }
  getCords(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send(err);
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
      return res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help Article Not Found.',
    name: 'Greg Munker',
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term',
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found.',
    name: 'Greg Munker',
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
