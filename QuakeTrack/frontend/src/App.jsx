import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <>
      <Navbar/>
      <div className="p-5 h-screen">
        <Outlet/>
      </div>
    </>
  )
}

export default App
