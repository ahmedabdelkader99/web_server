const request = require("request");

//this api  finding temp with lat and long

const forcaste = function (lat, long, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=8a58e024ce45de574ab11ff8c9a4b950&query= " +
    lat +
    " ," +
    long;

  request({ url, json: true }, function (error, response) {
    if (error) {
      callback("Unable To Connect Weather Servise", undefined);
    } else if (response.body.error) {
      callback("Unable To Find Location", undefined);
    } else {
      callback(undefined, response.body.current.temperature);
    }
  });
};

module.exports = forcaste;
