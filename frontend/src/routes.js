import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import HomePage from './pages/homePage'
import ProfilePage from './pages/profilePage'
import JobPage from './pages/jobPage'
import AppliedPage from './pages/appliedPage'
import { MainPage } from './pages/mainPage'
import Register from './sections/auth/register'
import Login from './sections/auth/login'
import CompanyDetails from './pages/companyDetails'
import RecruiterLayout from './layouts/recruiter/recruiterLayout'
import RecruiterRegister from './sections/recruiter/register'
import EditRecruiterProfile from './pages/EditRecruiterProfile'
import { useSelector } from 'react-redux'

export default function Router() {
    const { user } = useSelector((state) => state.auth)
    return useRoutes([
        user === 'RECRUITER' ? " " :
            {
                path: '/recruiter',
                element: <RecruiterLayout />,
                children: [
                    { path: "home", element: <HomePage /> },
                    { path: "profile", element: <ProfilePage /> },
                    { path: "lists", element: <JobPage /> },
                    { path: "applications", element: <AppliedPage /> },
                ]
            },

        user === 'RECRUITER' ? " " : {
            path: '/jobs',
            element: <MainLayout />,
            children: [
                { path: "home", element: <HomePage /> },
                { path: "profile", element: <ProfilePage /> },
                { path: "lists", element: <JobPage /> },
                { path: "applications", element: <AppliedPage /> },
            ]
        },
        {
            path: '/company',
            element: <MainLayout />,
            children: [
                { path: ":home", element: <CompanyDetails /> },
            ]
        },
        { path: '/', element: <MainPage /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        // recruiter 
        user === 'RECRUITER' ? {
            path: '/recruiter',
            element: <RecruiterLayout />,
            children: [
                { path: "dashboard", element: <CompanyDetails /> },
            ]
        } : "",
        { path: '/onboarding/recruiter/sign-up', element: <RecruiterRegister /> },
        { path: '/onboarding/recruiter', element: <EditRecruiterProfile /> },

    ])
}