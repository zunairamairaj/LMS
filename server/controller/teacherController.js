const Course = require('../model/coursesModel');
var Teacher = require('../model/teacherModel');

// create and save new teacher 
exports.create = (req, res) => {
    // Check if req empty
    if(!req.body) {
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }
    // new teacher
    const teacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        department: req.body.department,
        designation: req.body.designation,
        salary: req.body.salary
    })

    // save teacher in db
    teacher
    .save(teacher)
    .then(data => {
        // res.send(data)
        res.redirect('/teachers');
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
    
    
}

// return all teachers/ one teacher
exports.find = (req, res) => {
    if(req.query.id) {
        const id = req.query.id;
        Teacher.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Cannot get teacher with ${id}. Maybe user not found!`})
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in  getting teacher"})
        })
    }

    else {
        Teacher.find()
        .then(teacher => {
            res.send(teacher)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while doing get on teacher/tseachers"})
        })
    }
}

// update a teacher by teacher_ID
exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }
    const id = req.params.id;
    Teacher.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Cannot update teacher with ${id}. Maybe user not found!`})
            }
            else {
                res.send(data)
                // res.redirect('/');
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error in  updating teacher info"})
        })
}

// delete a teacher by teacher_ID and delete all the courses he teaches 
exports.delete = (req, res) => {
    const id = req.params.id;
    Promise.all([
        Teacher.findByIdAndRemove(id), 
        Course.find({teacher_ref: id}).deleteMany()
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