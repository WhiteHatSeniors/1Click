import  { useState } from 'react';

const Blogs = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlogPost = {
      name,
      content,
    };

    setBlogPosts([...blogPosts, newBlogPost]);

    // Clear input fields
    setName('');
    setContent('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block font-semibold mb-2">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your content"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{post.name}</h2>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
