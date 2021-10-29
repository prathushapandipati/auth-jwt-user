const express = require('express');
const router = express.Router();  //Skapar vi en instans av Router
const path = require('path');   //inbyggd core module

router.get('/batcave', (req, res) => {  //endpoint för batcave
    res.sendFile(path.resolve('public/batcave.html'));  //Skickar vi batcave.html till frontend
});

module.exports = router;