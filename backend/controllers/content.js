const express = require("express");
const Content = require("../models/content");
const contentRouter = express.Router();

const { check, validationResult } = require('express-validator');

// Define the route with validation middleware
contentRouter.post(
    "/insertContent",
    [
        check('title').notEmpty().withMessage('Title is required'),
        check('description').notEmpty().withMessage('Description is required'),
        check('links').isArray().withMessage('Links must be an array'),
        check('keywords').isArray().withMessage('Keywords must be an array'),
        check('courseCreaterEmail').isEmail().withMessage('Course creator email must be a valid email address'),
        check('difficulty').notEmpty().withMessage('Difficulty is required'),
        check('mentorEmail').isEmail().withMessage('Mentor email must be a valid email address'),
        check('images').optional().isArray().withMessage('Images must be an array if provided'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newContent = new Content({
                title: req.body.title,
                description: req.body.description,
                links: req.body.links,
                keywords: req.body.keywords,
                courseCreaterEmail: req.body.courseCreaterEmail,
                difficulty: req.body.difficulty,
                likes: [],
                mentorEmail: req.body.mentorEmail,
                images: req.body.images || [],
            });

            const savedContent = await newContent.save();
            res.status(201).json(savedContent);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);


contentRouter.get("/getAllContent", async (req, res) => {
    try {
        const contents = await Content.find();
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

contentRouter.get("/getContentById/:id", async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) return res.status(404).json({ message: "Content not found" });
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

contentRouter.put("/updateContentById/:id", async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) return res.status(404).json({ message: "Content not found" });

        content.title = req.body.title || content.title;
        content.description = req.body.description || content.description;
        content.links = req.body.links || content.links;
        content.keywords = req.body.keywords || content.keywords;
        content.courseCreaterEmail =
            req.body.courseCreaterEmail || content.courseCreaterEmail;
        content.difficulty = req.body.difficulty || content.difficulty;
        content.mentorEmail = req.body.mentorEmail || content.mentorEmail;
        content.images = req.body.images || content.images;

        const updatedContent = await content.save();
        res.json(updatedContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

contentRouter.delete("/deleteContentByEmail/:id", async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) return res.status(404).json({ message: "Content not found" });

        await content.remove();
        res.json({ message: "Content deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = contentRouter;
