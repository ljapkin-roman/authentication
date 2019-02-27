const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
var MemcachedStore = require('connect-memcached')(session);
app.use(cookieParser());
app.use(session({
  secret: 'some-private-key',
  key :'test',
  proxy: 'true',
  store : new MemcachedStore({
    hosts: ['127.0.0.1:11211'],
    secret: 'memcached-secret-key'
  })
}))
app.get('/', (req, res,next) => {
  var sessData = req.session;
  sessData.someAttribute = "foo";
  res.send('Returning with some text')
})
app.get('/bar', function(req, res, next){
  console.dir(req.session)
  var someAttribute = req.session.someAttribute;
  res.send(`This will print the attribute I set earlier: ${someAttribute}`)
})
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})
