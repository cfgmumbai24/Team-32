// jobsController.js

const express = require("express");
const Job = require("../models/job");
 // Adjust the path as needed
const { check, validationResult } = require('express-validator');
const jobsRouter = express.Router();
const { spawn } = require("child_process");

jobsRouter.post("/insertJob",
    [
        check('title').notEmpty().withMessage('Title is required'),
        check('description').notEmpty().withMessage('Description is required'),
        check('links').isArray().withMessage('Links must be an array'),
        check('keywords').isArray().withMessage('Keywords must be an array'),
        check('recruiterEmail').isEmail().withMessage('Invalid email address'),
    ],
    async (req, res) => {
        
        // Validate the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newJob = new Job({
                title: req.body.title,
                description: req.body.description,
                links: req.body.links,
                keywords: req.body.keywords,
                recruiterEmail: req.body.recruiterEmail,
            });

            const savedJob = await newJob.save();

            const type = 'jobs';

            const array = [savedJob._id, type]
            // Spawn Python process to execute code.py with _id and type as arguments
            const pythonProcess = spawn("python", [
                "C:\\Team-32\\backend\\controllers\\code.py",
                JSON.stringify(array)  // Convert the array to JSON string
            ]);
            // Listen for stdout data from Python script
            pythonProcess.stdout.on("data", (data) => {
                console.log(`Python stdout: ${data}`);
            });

            // Listen for errors from Python script
            pythonProcess.stderr.on("data", (data) => {
                console.error(`Python stderr: ${data}`);
            });
            res.status(201).json(savedJob);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// Get all jobs
jobsRouter.get("/getAllJobs", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific job by ID
jobsRouter.get("/getJobById/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update specific job by ID
jobsRouter.put("/updateJobById/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        job.title = req.body.title || job.title;
        job.description = req.body.description || job.description;
        job.links = req.body.links || job.links;
        job.keywords = req.body.keywords || job.keywords;
        job.recruiterEmail = req.body.recruiterEmail || job.recruiterEmail;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete specific job by ID
jobsRouter.delete("/deleteJobByEmail/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        await job.deleteOne();
        res.json({ message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = jobsRouter;
