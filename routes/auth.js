const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
// Register
router.post('/register', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hash });
    req.session.userId = user._id;
    res.json({ status: 'ok', user });
  } catch (e) { res.status(400).json({ error: e.message }); }
});
// Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !await bcrypt.compare(req.body.password, user.password))
    return res.status(401).json({ error: 'Invalid credentials' });
  req.session.userId = user._id;
  res.json({ status: 'ok', user });
});
// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ status: 'logged out' });
});
module.exports = router;