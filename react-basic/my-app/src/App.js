import './App.css';
import logo from './logo192.png'
import { useState } from 'react';

function App() {
  // let name = "thu ta nyan"
  let [name, setName] = useState('thu ta nyan');

  let changeName = () => {
    setName('aung aung');
    console.log(name);
  }

  return (
    <div className="app">
      <h1>Hello {name}</h1>
      <button onClick={changeName}>change name</button>
    </div>
  );
}

export default App;
