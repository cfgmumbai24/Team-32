import React, { useState, useEffect } from 'react';

const Post = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({

  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3010/api/getAllContent');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = id => {
    setPosts(posts.map(post => (
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    )));
  };

  const handleAddPost = () => {
    setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
    setIsModalOpen(false);
    setNewPost({ title: '', author: '', designation: '', content: '', likes: 0 });
  };

  const handleChange = e => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded p-4 mb-4">
           
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <div className="text-gray-500 text-sm mb-4">Explore around </div>
            <div className="flex items-start mb-4">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-bold text-gray-900">
                  {post.author}
                </div>
                <div className="text-sm text-gray-500 mb-1">{post.designation}</div>
                <div className="text-gray-700">{post.description}</div>
              </div>
            </div>
            </div>
        ))}
        
  
      </div>
    </div>
  );
};

export default Post;
