const express = require('express');
const app = express();
const mongoose = require('mongoose');  //Kommunicerar med mongodb
const dotenv = require('dotenv');  // att vi kan läsa .env filers innehåll
const PORT = process.env.PORT || 3000;

// routes/pages
const pages = require('./routes/pages');

dotenv.config(); //skapar en instans av dotenv

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to database!');
});

//auth route
const authRoute = require('./routes/auth');

//secure route
const secureRoute = require('./routes/secure');

//Middlewares
app.use(express.json());  //Använda JSON
app.use(express.static('public'));

//Route Middleware
app.use('/api/user', authRoute); //detta för logga in och signup för user
app.use('/api/secure', secureRoute); //detta använder säkring av sidan
app.use('/', pages);

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
