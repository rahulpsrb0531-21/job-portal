import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import HomePage from './pages/homePage'
import ProfilePage from './pages/profilePage'
import JobPage from './pages/jobPage'
import AppliedPage from './pages/appliedPage'
import { MainPage } from './pages/mainPage'
import Register from './sections/auth/register'
import Login from './sections/auth/login'

export default function Router() {
    return useRoutes([
        {
            path: '/jobs',
            element: <MainLayout />,
            children: [
                { path: "home", element: <HomePage /> },
                { path: "profile", element: <ProfilePage /> },
                { path: "lists", element: <JobPage /> },
                { path: "applications", element: <AppliedPage /> },
            ]
        },
        { path: '/', element: <MainPage /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },

    ])
}