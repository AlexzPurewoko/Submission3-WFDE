const express = require('express');

const app = express();

app.get('*.js', (req, res, next) => {
    if (req.header('Accept-Encoding').includes('br')) {
      req.url = req.url + '.br';
      console.log(req.header('Accept-Encoding'));
      res.set('Content-Encoding', 'br');
      res.set('Content-Type', 'application/javascript; charset=UTF-8');
    }
    next();
});

app.use(express.static('dist'));

const listener = app.listen(process.env.PORT || '8090', function() {
	console.log('Your app is listening on port ' + listener.address().port);
});