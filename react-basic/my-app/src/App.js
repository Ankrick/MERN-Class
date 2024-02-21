import './App.css';
import logo from './logo192.png'
import { useState } from 'react';
import Navbar from './components/Navbar/index';
import PostsList from './components/PostsList/index'
import Modal from './components/Modal/index'

function App() {

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




  return (
    <>
      <Navbar/>
      <PostsList posts={posts}/>
      <Modal>

          <h1>Zoom class is available now.</h1>
          <p>feel free to <a href="">Join Now</a></p>
      </Modal>
      <Modal>
        <h1>Terms and Conditions</h1>
      </Modal>
    </>
  );
}

export default App;
