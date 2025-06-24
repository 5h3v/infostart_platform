const courseSchema = new Schema({
  title: String,
  description: String,
  topics: [{ title: String, content: String, tests: [{ question: String, options: [String], answer: String }] }]
});
module.exports = model('Course', courseSchema);
