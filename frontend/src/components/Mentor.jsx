import React, { useState } from 'react';

const mentorsData = [
  {
    id: 1,
    name: 'John Doe',
    expertise: ['Business Strategy', 'Marketing', 'Leadership'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    expertise: ['Networking', 'Sales', 'Public Speaking'],
  },
  {
    id: 3,
    name: 'Emily Johnson',
    expertise: ['Funding', 'Startups', 'Venture Capital'],
  },
];

const MentorCard = ({ mentor, onFollow }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">{mentor.name}</h2>
      <div className="text-gray-500 text-sm mb-4">
        Expertise: {mentor.expertise.join(', ')}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onFollow(mentor.id)}
      >
        Follow
      </button>
    </div>
  );
};

const Mentorship = () => {
  const [followedMentors, setFollowedMentors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessIdea: '',
    goals: '',
    challenges: '',
  });

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
        {mentorsData.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} onFollow={handleFollow} />
        ))}
        <h2 className="text-xl font-bold mb-4">Apply for Mentorship</h2>
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
            <label className="block text-gray-700">Business Idea</label>
            <textarea
              name="businessIdea"
              value={formData.businessIdea}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Goals</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Challenges</label>
            <textarea
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mentorship;
