// src/components/JobDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { jobs } from '../data/jobData';

const JobDetail = () => {
  const { id } = useParams();
  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Contact:</strong> {job.contact}</p>
    </div>
  );
};

export default JobDetail;