import React, { useState } from 'react';

const postsData = [
  {
    id: 1,
    title: "How I started my own business from scratch.",
    author: 'John Doe',
    designation: 'Founder & CEO',
    content: 'Starting my own business was a challenging but rewarding journey. Here’s what I learned along the way.',
    likes: 45,
  },
  {
    id: 2,
    title: "The importance of networking for local entrepreneurs.",
    author: 'Jane Smith',
    designation: 'Business Consultant',
    content: 'Networking is crucial for building relationships and finding new opportunities. Here are my top tips.',
    likes: 30,
  },
  {
    id: 3,
    title: "How to secure funding for your startup.",
    author: 'Emily Johnson',
    designation: 'Venture Capitalist',
    content: 'Securing funding is often the hardest part of starting a business. Here’s how you can increase your chances.',
    likes: 60,
  },
];

const ExpertAnswer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(postsData);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = id => {
    setPosts(posts.map(post => (
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    )));
  };

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: "New Post Title",
      author: 'New Author',
      designation: 'New Designation',
      content: 'New post content.',
      likes: 0,
    };
    setPosts([...posts, newPost]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded p-4 mb-4">
            <div className="mb-2 text-gray-500 text-sm">
              Expert answers on <span className="font-bold text-black">Local Entrepreneurship</span>
            </div>
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <div className="text-gray-500 text-sm mb-4">Here's what else to consider</div>
            <div className="flex items-start mb-4">
              <img
                src="https://via.placeholder.com/40"  // Placeholder image URL
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-bold text-gray-900">
                  {post.author} <span className="text-gray-500 text-sm">• 3rd+</span>
                </div>
                <div className="text-sm text-gray-500 mb-1">{post.designation}</div>
                <div className="text-gray-700">{post.content}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <button
                className="flex items-center mr-4"
                onClick={() => handleLike(post.id)}
              >
                <span className="material-icons-outlined text-lg mr-1">thumb_up</span> Like
              </button>
              <span>{post.likes}</span>
            </div>
            <button className="text-blue-500 text-sm">View more answers</button>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddPost}
          >
            Add Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertAnswer;
