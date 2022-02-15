const request = require("request");
// this api convert address to lat and long
// you must use callback fun with http request

const geocode = function (address, callback) {
  const geoCodeUrl =
    " https://api.mapbox.com/geocoding/v5/mapbox.places/+address " +
    encodeURI(address) +
    ".json?access_token=pk.eyJ1IjoiYWhtZWRzZnNkZnNkZiIsImEiOiJja3ljeGR1MjgwY3diMm9ybXQ1eXdvM2c4In0.qkjo15QfirzZJ7VxgjrsoQ";
  request({ url: geoCodeUrl, json: true }, function (error, response) {
    if (error) {
      callback("Unable To Connect Weather Servise", undefined);
    } else if (response.body.features === 0) {
      callback("Unable To Find Location ,Try To Search Again", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
