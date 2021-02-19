var Course = require('../model/coursesModel');
const axios = require('axios');

// create and save new course 
exports.create = (req, res) => {
    // Check if req empty
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }
    const tid = req.params.tid;
    
    // new course
    const course = new Course({
        title: req.body.title,
        teacher_ref: tid,
        term: req.body.term,
        department: req.body.department,    
    })
    // save course in db
    course
    .save(course)
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

// return all courses/ one course
exports.find = (req, res) => {
    if(req.query.id) {
        const id = req.query.id;
        Course.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Cannot get course with ${id}. Maybe user not found!`})
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in  getting course"})
        })
    }

    else {
        Course.find({})
        .populate('teacher_ref')
        .then(course => {
            res.send(course)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while doing get on course/courses"})
        })
    }
}

// update a course by course_id
exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }
    const id = req.params.id;
    Course.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Cannot update course with ${id}. Maybe user not found!`})
            }
            else {
                res.send(data)
                // res.redirect('/');
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in  updating course info"})
        })
}

// delete a course by course_id
exports.delete = (req, res) => {
    const id = req.params.id;
    Course.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Cannot delete course with ${id}. Maybe user not found!`})
            }
            else {
                res.send({
                    message: "course was deleted successfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in  deleting course info"})
        })
}

exports.getStudentsOfCourse = (req, res) => {
    const id = req.params.id;
    Course.findById(id)
    .populate('studentsEnrolled')
    .then(course => {
        res.send(course)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while getting all students of a course"})
    })
}

exports.addStudentToCourse = (req, res) => {
    const cid = req.params.cid;
    const sid = req.params.sid;
    Course.findOneAndUpdate( 
            { _id: cid },
            { $push: { studentsEnrolled: sid } },
            { new: true, useFindAndModify: false },
        function (error, success) {
            if (error) {
                console.log("err" + error);
            } else {
                console.log("succ" + success);
            }
        });
}


exports.delStudentFromCourse = (req, res) => {
    const cid = req.params.cid;
    const sid = req.params.sid;
    Course.findOneAndUpdate(
        { _id: cid },
        { $pull: { studentsEnrolled :  sid } } ,
        { new: true, useFindAndModify: false },
        function (error, success) {
            if (error) {
                console.log("err" + error);
            } else {
                console.log("succ" + success);
            }
        });
}

