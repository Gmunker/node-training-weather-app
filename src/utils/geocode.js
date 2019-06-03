const request = require('request');

const mapBoxToken =
  'pk.eyJ1IjoiZ211bmtlciIsImEiOiJjanc2eGNtNmIyOGw2NDlwZ3JlNWdncW90In0.qcmqp7o-LZRMzznMClcn1w';

const getCords = (address, callback) => {
  const mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapBoxToken}&limit=1`;
  request({ url: mapBoxURL, json: true }, (err, res) => {
    const features = res.body.features[0];
    if (err) {
      callback('Unable to connect to location services', undefined);
    } else if (res.body.message === 'Not Found') {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const geoInfo = {
        location: features.place_name,
        latitude: features.geometry.coordinates[0],
        longitude: features.geometry.coordinates[1],
      };
      callback(undefined, geoInfo);
    }
  });
};

module.exports = { getCords };
