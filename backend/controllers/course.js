const express = require("express");
const Course = require("../models/course");
const courseRouter = express.Router();
const { check, validationResult } = require('express-validator');

courseRouter.post("/insertCourse",
    [
        check('title').notEmpty().withMessage('Title is required'),
        check('description').notEmpty().withMessage('Description is required'),
        check('links').isArray().withMessage('Links must be an array'),
        check('keywords').isArray().withMessage('Keywords must be an array'),
        check('courseCreaterEmail').isEmail().withMessage('Invalid email address'),
        check('difficulty').notEmpty().withMessage('Difficulty is required'),
    ],
    async (req, res) => {
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newCourse = new Course({
                title: req.body.title,
                description: req.body.description,
                links: req.body.links,
                keywords: req.body.keywords,
                courseCreaterEmail: req.body.courseCreaterEmail,
                difficulty: req.body.difficulty,
            });

            const savedCourse = await newCourse.save();
            res.status(201).json(savedCourse);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

courseRouter.get("/getAllCourse", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

courseRouter.get("/getCourseById/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update specific course by ID
courseRouter.put("/updateCourseById/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.title = req.body.title || course.title;
        course.description = req.body.description || course.description;
        course.links = req.body.links || course.links;
        course.keywords = req.body.keywords || course.keywords;
        course.courseCreaterEmail =
            req.body.courseCreaterEmail || course.courseCreaterEmail;
        course.difficulty = req.body.difficulty || course.difficulty;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete specific course by ID
courseRouter.delete("/deleteCourseByEmail/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        await course.remove();
        res.json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = courseRouter;
