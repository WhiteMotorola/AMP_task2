let express = require('express');
let fs = require('fs');
let path = require('path');

let app = express();
app.set('port', 3000);

app.use(express.static('../dist'));

app.get('/csv', function (req, res, next) {
  res.sendFile(path.join(__dirname, './d3-data.csv'));
});

app.listen(app.get('port'), function () {
  console.log('Diagram server is running on localhost:' + app.get('port'));
});