import './App.css';
import logo from './logo192.png'
import { useState } from 'react';

function App() {
  // let name = "thu ta nyan"
  let [name, setName] = useState('thu ta nyan');
  let [posts, setPost] = useState([
    {
      id : 1,
      title : 'First Post'
    },
    {
      id : 2,
      title : 'Second Post'
    },
    {
      id : 3,
      title : 'Third Post'
    }
  ]);

  let changeName = () => {
    setName('aung aung');
    console.log(name);
  }

  return (
    <div className="app">
      <h1>Hello {name}</h1>
      <button onClick={changeName}>change name</button>

      <h1>Posts</h1>
      <ul>
        {posts.map((post)=>(
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
