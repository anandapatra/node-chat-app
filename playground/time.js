const moment = require('moment');

var date = moment();
console.log(date.format('MMM Do YYYY'));

// 10:35 am
console.log(date.format('hh:mm a'));
