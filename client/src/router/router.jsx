import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import Home from '../pages/Home/Home';
import BlogView from '../pages/Blog view/BlogView';
import useAxiosPublic from '../hooks/useAxiosPublic';
import SignUp from '../pages/Sign up/SignUp';
import SignIn from '../pages/Sign in/SignIn';
import PrivateRoute from '../components/Private route/PrivateRoute';
import Dashboard from '../layouts/Dashboard/Dashboard';

import Profile from '../pages/Profile/Profile';
import Compose from '../pages/Dashboard/Compose';


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
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/profile",
                element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        children: [
            {
                path: "/dashboard/compose",
                element: <Compose />
            }
        ]
    }
])