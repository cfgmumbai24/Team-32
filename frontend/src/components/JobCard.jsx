import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const JobCards = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3010/api/getAllJobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
  
    fetchJobs();
  }, []);// Empty dependency array means this effect runs only once after the initial render

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
              <h2 className="text-white text-lg font-medium">{job.title}</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="leading-relaxed text-base text-white">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="leading-relaxed text-base text-white">
                <strong>Description:</strong> {job.description}
              </p>
              <p className="leading-relaxed text-base text-white">
                <strong>Contact:</strong> {job.contact}
              </p>
              <Link to={`/job/${job.id}`} className="mt-3 text-black hover:text-blue-600 inline-flex items-center">
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
