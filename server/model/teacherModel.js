const mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    designation: {
        type: String
    },
    salary: {
        type: Number
    },

})

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;