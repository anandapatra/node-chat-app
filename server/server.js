const path= require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || port;


var app = express();
app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
