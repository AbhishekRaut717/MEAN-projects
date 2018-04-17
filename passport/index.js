var express = require('express');
var app = express();
var authRoutes = require('./routes/authRoutes');
var passportConfig = require('./config/passportSetup.js');

app.set('view engine', 'ejs');
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('We are live on 3000');
});
