// src/App.jsx
import React, { useState, useEffect } from "react";

function App() {
  // State management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch API data with loading & error handling
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Filter posts by search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Posts</h1>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </header>

      {loading && <p className="text-center text-blue-600">Loading posts...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <ul className="space-y-4">
          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500">No posts found.</p>
          )}
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;