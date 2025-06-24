const express = require('express');
const Course = require('../models/course');
const User = require('../models/user');
const router = express.Router();
// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});
// Get single course by id
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});
// Mark lesson complete (student progress)
router.post('/:courseId/lesson/:lessonId/complete', async (req, res) => {
  const user = await User.findById(req.session.userId);
  let prog = user.progress.find(p => p.course.equals(req.params.courseId));
  if (!prog) {
    user.progress.push({ course: req.params.courseId, lessonsCompleted: [] });
    prog = user.progress[user.progress.length-1];
  }
  if (!prog.lessonsCompleted.includes(req.params.lessonId))
    prog.lessonsCompleted.push(req.params.lessonId);
  await user.save();
  res.json({ status: 'lesson completed', progress: prog });
});
module.exports = router;
