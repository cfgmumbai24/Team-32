// src/components/JobCards.js
import React from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobData.js'; // Ensure the correct path to the jobData file

const JobCards = () => {
  return (
    <div className="flex flex-wrap justify-center mt-10">
      {jobs.map(job => (
        <div key={job.id} className="p-4 max-w-sm">
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
            <div className="flex items-center mb-3">
              <div
                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0"
              >
                {/* Icon Placeholder */}
              </div>
              <h2 className="text-white dark:text-white text-lg font-medium">{job.title}</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="leading-relaxed text-base text-white dark:text-gray-300">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="leading-relaxed text-base text-white dark:text-gray-300">
                <strong>Description:</strong> {job.description}
              </p>
              <p className="leading-relaxed text-base text-white dark:text-gray-300">
                <strong>Contact:</strong> {job.contact}
              </p>
              <Link to={`/job/${job.id}`} className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;