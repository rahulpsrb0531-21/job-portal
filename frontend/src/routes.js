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
import EditRecruiterProfile from './pages/recruiter/EditRecruiterProfile'
import { useSelector } from 'react-redux'
import CreateJob from './pages/recruiter/createJob'
import RecruiterLogin from './sections/recruiter/login'
import RecruiterJobs from './pages/recruiter/recruiterJobs'
import JobDetails from './pages/jobDetails'

export default function Router() {
    const { user } = useSelector((state) => state.auth)
    return useRoutes([
        user === 'RECRUITER' ? " " :
            {
                path: '/recruiter',
                element: <RecruiterLayout />,
                children: [
                    { path: "dashboard", element: <CompanyDetails /> },
                    { path: "jobs", element: <RecruiterJobs /> },
                    { path: "create/job", element: <CreateJob /> },
                ]
            },

        user === 'RECRUITER' ? " " : {
            path: '/jobs',
            element: <MainLayout />,
            children: [
                { path: "home", element: <HomePage /> },
                { path: "profile", element: <ProfilePage /> },
                { path: "lists", element: <JobPage /> },
                { path: ":jobName", element: <JobDetails /> },
                { path: "applications", element: <AppliedPage /> },
            ]
        },
        {
            path: '/company',
            element: <MainLayout />,
            children: [
                { path: ":name", element: <CompanyDetails /> }
            ]
        },
        { path: '/', element: <MainPage /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        // recruiter 
        // user === 'RECRUITER' ? {
        //     path: '/recruiter',
        //     element: <RecruiterLayout />,
        //     children: [
        //         { path: "dashboard", element: <CompanyDetails /> },
        //     ]
        // } : "",
        { path: '/onboarding/recruiter/login', element: <RecruiterLogin /> },
        { path: '/onboarding/recruiter/sign-up', element: <RecruiterRegister /> },
        { path: '/onboarding/recruiter', element: <EditRecruiterProfile /> },

    ])
}