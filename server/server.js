const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser());
app.get('/', (req, res,next) => {
  
  res.send('Returning with some text')
})
app.get('/login', (req, res,next) => {
  res.send('You have come at home')
})

app.post('/login', (req, res,next) => {
  console.dir(req.body)
  res.send('You sent a post request')
})


app.get('/bar', function(req, res, next){
  console.dir(req.session)
  var someAttribute = req.session.someAttribute;
  res.send(`This will print the attribute I set earlier: ${someAttribute}`)
})
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
