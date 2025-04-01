import { Link } from "react-router-dom"



export default function Navbar(){
    return (
        <div className="border border-gray-300 shadow-sm">
            <nav className="flex justify-between items-center p-5 w-full max-w-screen-lg mx-auto bg-white">
                <div>
                    <h1 className="font-bold text-2xl text-blue-600">QuakeTrack</h1>
                </div>
                <ul className="flex space-x-10 font-semibold">
                    <li><Link to ="/" className="hover:text-blue-400">Home</Link></li>
                    <li><Link to ="/about" className="hover:text-blue-400">About</Link></li>
                    <li><Link to ="/contact" className="hover:text-blue-400">Contact</Link></li>
                </ul>
            </nav>
        </div>
    )
}
 
    