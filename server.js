var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname + 'dist')));

app.all('*', function (req, res) {
    res.status(200).sendfile(
        path.join(__dirname, 'dist', 'index.html'));
})

app.listen(app.get('port'), function () {
    console.log("não executando na porta");
})
