import App from '../App.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import RecipeForm from '../pages/RecipeForm.jsx'
import SignUpForm from '../pages/SignUpForm.jsx'
import SignInForm from '../pages/SignInForm.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Home from '../pages/Home.jsx';
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx'

export default function index() {

  let { user } = useContext(AuthContext);

    const router = createBrowserRouter([
        {
          path: "/",
          element: <App/>,
          children: [
            {
              path: "/",
              element: user ? <Home/> : <Navigate to={'/sign-in'}/>
            },
            {
              path: "/about",
              element: <About/>
            },
            {
              path: "/contact",
              element: <Contact/>
            },
            {
              path: "/recipes/create",
              element: user ? <RecipeForm/> : <Navigate to={'/sign-in'}/>
            },
            {
              path: "/recipes/edit/:id",
              element: <RecipeForm/>
            },
            {
              path: "/sign-up",
              element: !user ? <SignUpForm/> : <Navigate to={'/'}/>
            },
            {
              path: "/sign-in",
              element: !user ? <SignInForm/> : <Navigate to={'/'}/>
            }
          ]
        },
      ]);

    return (
        <RouterProvider router={router} />
    )
}