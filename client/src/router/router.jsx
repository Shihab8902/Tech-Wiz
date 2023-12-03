import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import Home from '../pages/Home/Home';
import BlogView from '../pages/Blog view/BlogView';
import useAxiosPublic from '../hooks/useAxiosPublic';
import SignUp from '../pages/Sign up/SignUp';


const axiosPublic = useAxiosPublic();

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/blog/:id",
                element: <BlogView />,
                loader: ({ params }) => axiosPublic.get(`/blogs/${params.id}`)
            },
            {
                path: "/signup",
                element: <SignUp />
            }
        ]
    }
])