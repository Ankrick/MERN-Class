import App from '../App.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from '../pages/Home.jsx';


export default function index() {


    const router = createBrowserRouter([
        {
          path: "/",
          element: <App/>,
          children: [
            {
              path: "/",
              element: <Home/>
            },
            {
              path: "/about",
              element: <About/>
            },
            {
              path: "/contact",
              element: <Contact/>
            }
          ]
        },
      ]);

    return (
        <RouterProvider router={router} />
    )
}