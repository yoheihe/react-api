import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);

  // 全ての投稿を取得
  const fetchPosts = () => {
    console.log('step1');
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json().then(data => {
        console.log('step2');
        console.log(data);
        setPosts(data);
      }))
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    // test 
    console.log('step3');
  };
  // 投稿をクリアする
  const clearPosts = () => {
    setPosts([]);
  };

  return (
    <div>
      <h2>Results</h2>
      <button onClick={fetchPosts}>Fetch Posts</button>
      <button onClick={clearPosts}>Clear Posts</button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
