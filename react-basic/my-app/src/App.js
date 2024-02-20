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

  let deletePost = (id) => {
    setPost((prevState) => prevState.filter(post => post.id != id))
  }

  return (
    <div className="app">
      <h1>Hello {name}</h1>
      <button onClick={changeName}>change name</button>

      <h1>Posts</h1>
      <ul>
        {posts.map((post)=>(
          <li key={post.id}>
              {post.title}
              <button onClick = {() => deletePost(post.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
