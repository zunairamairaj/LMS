var Student = require('../model/studentModel');
var Course = require('../model/coursesModel');
var courseController = require('./courseController');

// create and save new student 
exports.create = (req, res) => {
    // Check if req empty
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }
    // new student
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        program: req.body.program,
        batch: req.body.batch
    })

    // save student in db
    student
    .save(student)
    .then(data => {
        // res.send(data)
        res.redirect('/');
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while doing a create operation"
        });
    });
    
    
}

// return all students/ one student
exports.find = (req, res) => {
    if(req.query.id) {
        const id = req.query.id;
        Student.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Cannot get student with ${id}. Maybe user not found!`})
            }
            else {
                res.send(data)
                console.log('hi')
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in  getting student"})
        })
    }

    else {
        Student.find()
        .then(student => {
            res.send(student)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while doing get on student/students"})
        })
    }
}

// update a student by student_id
exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }
    const id = req.params.id;
    Student.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Cannot update student with ${id}. Maybe user not found!`})
            }
            else {
                res.send(data)
                // res.redirect('/');
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in  updating student info"})
        })
}

// delete a student by student_id and delete all the references to it in courses.
exports.delete = (req, res) => {
    const id = req.params.id;
    Promise.all([
        Student.findByIdAndRemove(id), 
        Course.updateMany(
            { _id: id },
            { $pull: { studentsEnrolled :  id } }
        )
    ])
    .then(values => {
        res.send({
            message: "Success"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Failure"
        })
    })
}


// 5fe20a4cae5640271c773407
// 5fe20aa217b7c32928c3f888
// 5fe20b0617b7c32928c3f88a

// 5fe27a18992b973ac81c5143