import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import RecipeForm from './pages/RecipeForm.jsx'
import SignUpForm from './pages/SignUpForm.jsx'
import SignInForm from './pages/SignInForm.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home/>
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
        element: <RecipeForm/>
      },
      {
        path: "/recipes/edit/:id",
        element: <RecipeForm/>
      },
      {
        path: "/sign-up",
        element: <SignUpForm/>
      },
      {
        path: "/sign-in",
        element: <SignInForm/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider><RouterProvider router={router} /></AuthContextProvider>
)
