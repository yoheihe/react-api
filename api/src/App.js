import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchId, setSearchId] = useState('');

  // 特定のIDの投稿を取得
  const fetchPosts = () => {
    console.log('step1');
    const url = searchId 
      //条件演算子、searchIdが空でない（true）のときに下記URLを使用
      ? `https://jsonplaceholder.typicode.com/posts/${searchId}`
      //条件演算子、searchIdが空、未定義のとき（faise）のときに下記URLを使用、すべての項目を取得
      : 'https://jsonplaceholder.typicode.com/posts';

    fetch(url)
      .then(response => response.json().then(data => {
        console.log('step2');
        console.log(data);
        // searchIdがある場合はオブジェクトを配列に変換
        const postsData = searchId ? [data] : data;
        setPosts(postsData);
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
    setSearchId('');
  };

  return (
    <div>
      <h2>Results</h2>
      <input 
        type="text" 
        placeholder="Search by ID" 
        value={searchId} 
        onChange={(e) => setSearchId(e.target.value)} 
      />
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
