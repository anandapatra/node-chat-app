const moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, coord) => {
  return {
     from,
     url: `https://www.google.com/maps?q=${coord.lat},${coord.lon}`,
     createdAt: moment().valueOf()
  }
}

module.exports = {generateMessage, generateLocationMessage};
