var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, coord) => {
  return {
     from,
     url: `https://www.google.com/maps?q=${coord.lat},${coord.lon}`,
     createdAt: new Date().getTime()
  }
}

module.exports = {generateMessage, generateLocationMessage};
