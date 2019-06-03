const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const weatherURL = `https://api.darksky.net/forecast/fdab56c01729ed399812059cfceac1f7/${latitude},${longitude}`;

  request({ url: weatherURL, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback('Unable to connect to the weather services', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const forecastSummary = `${body.daily.data[0].summary} Currently it is ${
        body.currently.temperature
      } degrees out, and there is ${
        body.currently.precipProbability
      } chance of rain.`;
      callback(undefined, forecastSummary);
    }
  });
};

module.exports = { forecast };
