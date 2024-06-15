// jobsController.js

const express = require("express");
const Job = require("../models/job"); // Adjust the path as needed
const jobsRouter = express.Router();

// Create a new job
jobsRouter.post("/", async (req, res) => {
    try {
        const newJob = new Job({
            title: req.body.title,
            description: req.body.description,
            links: req.body.links,
            keywords: req.body.keywords,
            recruiterEmail: req.body.recruiterEmail,
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all jobs
jobsRouter.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific job by ID
jobsRouter.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update specific job by ID
jobsRouter.put("/:id", async (req, res) => {
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
jobsRouter.delete("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        await job.remove();
        res.json({ message: "Job deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = jobsRouter;
