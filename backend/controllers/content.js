const express = require("express");

const Content = require("../models/content");
const jwt = require('jsonwebtoken');

const contentRouter = express.Router();
const { tokenExtractor, userExtractor } = require('../utils/middleware');
const { spawn } = require("child_process");

const { check, validationResult } = require('express-validator');

contentRouter.post(
    '/insertContent',
    tokenExtractor,
    [
        check('title').notEmpty().withMessage('Title is required'),
        check('description').notEmpty().withMessage('Description is required'),
        check('links').isArray().withMessage('Links must be an array'),
        check('likes').isArray().withMessage('Likes must be an array'),
        check('keywords').isArray().withMessage('Keywords must be an array'),
        check('contentCreatorEmail')
            .isEmail()
            .withMessage('Invalid email address'),
        check('images')
            .optional()
            .isArray()
            .withMessage('Images must be an array if provided'),
    ],
    async (req, res) => {
        console.log('Request:', req.body);
        const errors = validationResult(req);
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        console.log('Decoded Token:', decodedToken);
        if (!decodedToken.email) {
            return response.status(401).json({ error: 'token invalid' })
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newContent = new Content({
                title: req.body.title,
                description: req.body.description,
                links: req.body.links,
                likes: req.body.likes,
                keywords: req.body.keywords,
                contentCreatorEmail: req.body.contentCreatorEmail,
                images: req.body.images,
            });

            
            const savedContent = await newContent.save();
            console.log('Saved Content:', savedContent);

            const type = 'contents';

            const array = [savedContent._id, type]
            // Spawn Python process to execute code.py with _id and type as arguments
            const pythonProcess = spawn("python", [
                "C:\\Team-32\\backend\\controllers\\code.py",
                JSON.stringify(array)  // Convert the array to JSON string
            ]);
            // Listen for stdout data from Python script
            pythonProcess.stdout.on("data", (data) => {
                console.log(`Python stdout: ${ data }`);
            });

            // Listen for errors from Python script
            pythonProcess.stderr.on("data", (data) => {
                console.error(`Python stderr: ${ data }`);
            });


            // Respond with the saved content
            res.status(201).json(savedContent);
        } catch (error) {
            console.error('Error:', error.message);
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

contentRouter.put("/updateContentById/:id", tokenExtractor ,async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        console.log('Decoded Token:', decodedToken);
        if (!decodedToken.email) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const content = await Content.findById(req.params.id);
        if (!content) return res.status(404).json({ message: "Content not found" });

        content.title = req.body.title || content.title;
        content.description = req.body.description || content.description;
        content.links = req.body.links || content.links;
        content.likes = req.body.likes || content.likes;
        content.keywords = req.body.keywords || content.keywords;
        content.contentCreatorEmail = req.body.contentCreatorEmail || content.contentCreatorEmail;
        content.images = req.body.images || content.images;

        const updatedContent = await content.save();
        res.json(updatedContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

contentRouter.delete("/deleteContentByEmail/:id", tokenExtractor , async (request, response) => {
        try {

            const decodedToken = jwt.verify(request.token, process.env.SECRET);
            console.log('Decoded Token:', decodedToken);
            if (!decodedToken.email) {
                return response.status(401).json({ error: 'token invalid' })
            }

            // Find the content by its ID
            const content = await Content.findById(request.params.id);
            if (!content) {
                return response.status(404).json({ message: 'Content not found' });
            }

            // Remove the content from the database
            await content.deleteOne();

            // Respond with a success message
            response.status(204).json({ message: 'Content deleted' }).end();
        } 
        catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
);

module.exports = contentRouter;
