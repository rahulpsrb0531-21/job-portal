import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import HomePage from './pages/homePage'
import ProfilePage from './pages/profilePage'
import JobPage from './pages/jobPage'
import AppliedPage from './pages/appliedPage'

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { path: "/home", element: <HomePage /> },
                { path: "/profile", element: <ProfilePage /> },
                { path: "/jobs", element: <JobPage /> },
                { path: "/applications", element: <AppliedPage /> },
            ]
        },

    ])
}