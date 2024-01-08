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
import ManageUsers from '../pages/Dashboard/Admin/Manage Users/ManageUsers';
import MyBlogs from '../pages/Dashboard/MyBlogs';
import UpdateBlog from '../pages/Dashboard/UpdateBlog';
import AuthorRequests from '../pages/Dashboard/Admin/Author/AuthorRequests';
import Statistics from '../pages/Dashboard/Admin/Statistics/Statistics';
import AuthorStats from '../pages/Dashboard/Author/AuthorStats';
import BlogPosts from '../components/BlogPosts/BlogPosts';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';


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
                path: "/category/:category",
                element: <PrivateRoute>
                    <BlogPosts />
                </PrivateRoute>
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
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
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
                path: "/dashboard/authorStats",
                element: <AuthorRoute>
                    <AuthorStats />
                </AuthorRoute>
            },
            {
                path: "/dashboard/compose",
                element: <AuthorRoute>
                    <Compose />
                </AuthorRoute>
            },
            {
                path: "/dashboard/myblogs",
                element: <AuthorRoute>
                    <MyBlogs />
                </AuthorRoute>
            },
            {
                path: "/dashboard/edit/:id",
                element: <AuthorRoute>
                    <UpdateBlog />
                </AuthorRoute>,
                loader: ({ params }) => axiosPublic.get(`/blog/${params.id}`)
            },

            //Admin routes
            {
                path: "/dashboard/manageBlogs",
                element: <AdminRoute>
                    <ManageBlogs />
                </AdminRoute>
            },
            {
                path: "/dashboard/statistics",
                element: <AdminRoute>
                    <Statistics />
                </AdminRoute>
            },
            {
                path: "/dashboard/manageUsers",
                element: <AdminRoute>
                    <ManageUsers />
                </AdminRoute>
            },
            {
                path: "/dashboard/authorRequests",
                element: <AdminRoute>
                    <AuthorRequests />
                </AdminRoute>
            }
        ]
    }
])