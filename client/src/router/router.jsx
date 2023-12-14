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
import AuthorRoute from '../components/AuthorRoute/AuthorRoute';
import AdminRoute from '../components/AdminRoute/AdminRoute';
import ManageBlogs from '../pages/Dashboard/Admin/Manage Blogs/ManageBlogs';


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
                loader: ({ params }) => axiosPublic.get(`/blog/${params.id}`)
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
            //Author routes
            {
                path: "/dashboard/compose",
                element: <AuthorRoute>
                    <Compose />
                </AuthorRoute>
            },

            //Admin routes
            {
                path: "/dashboard/manageBlogs",
                element: <AdminRoute>
                    <ManageBlogs />
                </AdminRoute>
            }
        ]
    }
])