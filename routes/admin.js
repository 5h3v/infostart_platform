const express = require('express');
const Course = require('../models/course');
const User = require('../models/user');
const router = express.Router();
// Middleware: check admin role
router.use((req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
  User.findById(req.session.userId).then(user => {
    if (user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
    next();
  });
});
// CRUD courses
router.post('/courses', async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});
router.put('/courses/:id', async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(course);
});
router.delete('/courses/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ status: 'deleted' });
});
module.exports = router;
