const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/verify', async(req,res) => {  
    res.redirect('/batcave');
});

module.exports = router;