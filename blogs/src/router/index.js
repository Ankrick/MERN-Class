import {
  createBrowserRouter,
} from "react-router-dom";
import App from '../App';
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from '../pages/Contact';
import BlogDetail from '../pages/BlogDetail'
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '',
            element: <Home/>,
        },
        {
            path: '/about',
            element: <About/>,
        },
        {
            path: '/contact',
            element: <Contact/>,
        },
        {
          path: '/blogs/:id',
          element: <BlogDetail/>
        },
        {
          path: '*',
          element: <NotFound/>
        }        
      ]
    },
  ]);

  export default router;

  