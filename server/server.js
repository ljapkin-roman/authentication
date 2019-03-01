const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const app = express();
app.use(bodyParser());
var expiryDate = new Date(Date.now() + 60*1000)
app.use(session({
	genid: (req) => {
		console.log('inside the session middleware')
		console.log(req.sessionID)
		return uuid()
	},
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
app.get('/', (req, res,next) => {
  res.send('Returning with some text\n')
})
app.get('/login', (req, res,next) => {
  res.send('You have come at home\n')
})

app.post('/login', (req, res,next) => {
  console.log("have contact")
  console.dir(req)
  res.send('You sent a post request\n')
})


app.get('/bar', function(req, res, next){
  console.dir(req.session)
  var someAttribute = req.session.someAttribute;
  res.send(`This will print the attribute I set earlier: ${someAttribute}`)
})
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
