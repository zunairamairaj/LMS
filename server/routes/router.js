const { request } = require('express');
const express = require('express');
const route = express.Router();
const services = require('../services/render');
const studentController = require('../controller/studentController');
const teacherController = require('../controller/teacherController');
const courseController = require('../controller/courseController');

// Main Pages
route.get('/', services.homeRoutes);//Home route is student page
route.get('/teachers', services.teacherPage);
route.get('/courses', services.coursesPage);
route.get('/open-course', services.openCourse);

// Forms
route.get('/add-student', services.add_student);
route.get('/update-student', services.update_student);

route.get('/add-teacher', services.add_teacher);
route.get('/update-teacher', services.update_teacher);

route.get('/add-course', services.add_course);
route.get('/update-course', services.update_course);


// Student APIs
route.post('/api/students', studentController.create);
route.get('/api/students', studentController.find);
route.put('/api/students/:id', studentController.update);
route.delete('/api/students/:id', studentController.delete);

// Teacher APIs
route.post('/api/teachers', teacherController.create);
route.get('/api/teachers', teacherController.find);
route.put('/api/teachers/:id', teacherController.update);
route.delete('/api/teachers/:id', teacherController.delete);

// Course APIs 
route.post('/api/courses/:tid', courseController.create);
route.get('/api/courses', courseController.find);
route.put('/api/courses/:id', courseController.update);
route.delete('/api/courses/:id', courseController.delete);

route.get('/api/courses/:id', courseController.getStudentsOfCourse);

// Adding/Removing Students from a Course
route.put('/api/courses/:cid/:sid', courseController.addStudentToCourse);
route.delete('/api/courses/:cid/:sid', courseController.delStudentFromCourse);

module.exports = route

// 5fe20a4cae5640271c773407