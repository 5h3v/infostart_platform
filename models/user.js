const { Schema, model } = require('mongoose');
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['student','instructor','admin'], default: 'student' },
  progress: [{ course: { type: Schema.Types.ObjectId, ref: 'Course' },
               lessonsCompleted: [Schema.Types.ObjectId] }]
});
module.exports = model('User', userSchema);
