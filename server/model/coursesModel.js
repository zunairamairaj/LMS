const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    teacher_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
    
    term: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    studentsEnrolled: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student"
        }
    ]
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;