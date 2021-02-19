
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