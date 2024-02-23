import './App.css';
import logo from './logo192.png'
import { useState } from 'react';
import Navbar from './components/Navbar/index';
import PostsList from './components/PostsList/index'
import Modal from './components/Modal/index'
import PostForm from './components/PostForm'

function App() {

  let [showModal, setShowModal] = useState(false);
  let [posts, setPost] = useState([
    {
      id : 1,
      title : 'First Post'
    },
    {
      id : 2,
      title : 'Second Post'
    },
    ]);

  let addPost = (post) => {
    setPost(prevState => [...prevState, post])
    setShowModal(false);
  }


  return (
    <>
      <Navbar setShowModal={setShowModal}/>
      <PostsList posts={posts}/>
      {showModal && <Modal setShowModal={setShowModal}>
        <PostForm addPost={addPost}/>
      </Modal>}
    </>
  );
}

export default App;
