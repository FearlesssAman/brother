const express = require('express');
const User = require('../models/User'); // Make sure the path to your User model is correct
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwtsecret = "hsjeusadjksjnskdfhisncbdhsienssi"
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/createuser', [
  body('email').isEmail(),
  body('name').isLength({ min: 10 }),
  body('password').isLength({ min: 6 }),
  body('location')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  let setpassword = await bcrypt.hash(req.body.password ,salt);

  try {
    await User.create({

      name: req.body.name,
      password: setpassword,
      email: req.body.email,
      location: req.body.location
    }).then(res.json({ success: true }))
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

router.post('/loginuser', [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let email = req.body.email;
    let userdata = await User.findOne({ email });
      let passcompare = await bcrypt.compare(req.body.password , userdata.password);
    if (!userdata) {
      return res.status(400).json({ errors: [{ msg: "Email not found" }] });
    }

    if (!passcompare) {
      return res.status(400).json({ errors: [{ msg: "Incorrect password" }] });
    }

     const data = {
      user :{
        id:userdata.id,
      }
     }


   const authtoken = jwt.sign(data , jwtsecret)
    return res.json({ success: true  , authtoken:authtoken});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});




module.exports = router;
