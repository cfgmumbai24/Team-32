import React from 'react';
import JobCard from '../JobCard';

const Jobs = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <JobCard />
    </div>
  );
};

export default Jobs;