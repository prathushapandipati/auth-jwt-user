const router = require('express').Router();
//import User Model
const User = require('../model/User'); // User schema

//import validation funktion
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');  //hashar vår lösenor, krypterar lösenordet
const jwt = require('jsonwebtoken');   //importerar jsonwebtoken

router.post('/register', async (req, res) => {  //  /api/user/register
    console.log(req.body);
    //validate user
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // if existing user
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).json({ error: 'Email exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);  //här skapar vi en algorithm för hur mycket säker vår lösen ska vara
    const hashPassword = await bcrypt.hash(req.body.password, salt);  //skapar en super secret password!

    //Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save(); //detta sparar User i databasen
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);  //detta skapar en token
        res.json({ user: user._id, redirect: 'batcave', token });  //Skickar detta information till frontend
    } catch (error) {
        res.status(400).json(error);

    }
});

router.post('/login', async (req, res) => { 

    //validate user
    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    //if existing email
    const user = await User.findOne({email: req.body.email});

    if(!user) {  //om det inte finns någon samma email
        return res.status(400).json({error: 'Email is not found'});
    }

    //Password correct?
    const validPassword = await bcrypt.compare(req.body.password, user.password);
     
    if(validPassword) {
        return res.status(400).json({error: 'Invalid password'});
    }

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET); //Skapar en token för att skicka till frontend

    res.header('auth-token', token).json({token:token, redirect:'batcave'}); // Här sätter vi token i headern på vår /login POST

});


module.exports = router;