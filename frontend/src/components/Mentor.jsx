import React, { useState, useEffect } from 'react';

const MentorCard = ({ mentor, onFollow }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">{mentor.name}</h2>
      <div className="text-gray-500 text-sm mb-4">
        Expertise: {mentor.keywords.join(' ,')}
      </div>
    
    </div>
  );
};

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [followedMentors, setFollowedMentors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    keywords: '',
    goals: '',
    challenges: '',
  });

  useEffect(() => {
    fetch('http://localhost:3010/api/getAllUsers')
      .then(response => response.json())
      .then(data => setMentors(data.filter(x=>x.role==2)))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleFollow = (mentorId) => {
    if (!followedMentors.includes(mentorId)) {
      setFollowedMentors([...followedMentors, mentorId]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Meet Our Mentors</h1>
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} onFollow={handleFollow} />
        ))}
        {/* <h2 className="text-xl font-bold mb-4">Apply for Mentorship</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Expertise</label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Mentorship;
