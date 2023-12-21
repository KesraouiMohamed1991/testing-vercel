const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Bar, Blog, Event } = require('../models/DBModels');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const uniqid = require('uniqid');
const fs = require('fs');


cloudinary.config({
  cloud_name: 'dsttg3p2z',
  api_key: '651845119925515',
  api_secret: 'zVP5tTdsSxRratzwitKT81B-ZNE'
});

router.get('/all', async (req, res) => {
  try {
    const bars = await Bar.find();
    res.json(bars);
  } catch (error) {
    console.error('Error fetching bars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users/signup', async (req, res) => {
  try {
    if (!checkBody(req.body, ['username', 'password', 'mail', 'phoneNumber'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      res.json({ result: false, error: 'User already exists' });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 4);
      const user = new User({
        username: req.body.username,
        password: hash,
        mail: req.body.mail,
        phoneNumber: req.body.phoneNumber,
        token: uid2(16),
      });

      const savedUser = await user.save();

      res.json({
        result: true,
        token: savedUser.token,
        mail: savedUser.mail,
        username: savedUser.username
      });
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users/signin', async (req, res) => {
  try {
    if (!checkBody(req.body, ['username', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    const user = await User.findOne({ username: req.body.username });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {

      res.json({
        result: true,
        user
      });

      console.log(user);

    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/users/deleteOne', async (req, res) => {
  try {
    if (!checkBody(req.body, ['username'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

    const deletedUser = await User.findOneAndDelete({ username: req.body.username });

    if (deletedUser) {
      res.json({ result: true, message: 'User deleted successfully' });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during user deletion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.photoFromFront) {
      return res.status(400).json({ result: false, error: 'No file uploaded' });
    }

    const photoPath = `./tmp/${uniqid()}.jpg`;

    await req.files.photoFromFront.mv(photoPath);

    const resultCloudinary = await cloudinary.uploader.upload(photoPath);

    res.json({ result: true, url: resultCloudinary.secure_url });

    fs.unlinkSync(photoPath);
  } catch (error) {
    console.error('Error during file upload:', error);

    // Log more details about the error
    console.error('Error details:', error.message, error.stack);

    res.status(500).json({ result: false, error: 'Internal Server Error' });
  }
});

router.put('/users/changePassword', async (req, res) => {
  try {
    if (!checkBody(req.body, ['username', 'password', 'newPassword'])) {
      res.json({ result: false, error: 'informations manquantes' });
      return;
    }

    const user = await User.findOne({ username: req.body.username });
    console.log('Password from database:', user ? user.password : 'User not found');

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const hash = bcrypt.hashSync(req.body.newPassword, 8);

      console.log('Password comparison succeeded');
      console.log('user AVANT: ', user);

      user.password = hash;

      const savedUser = await user.save();

      res.json({
        result: true,
        password: savedUser.password,
      });
    } else {
      console.log('Password comparison failed');
      console.log('user AVANT: ', user);
      res.json({ result: false, error: 'Mot de passe erroné' });
    }
  } catch (error) {
    console.error('Error during password change:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








module.exports = router;
