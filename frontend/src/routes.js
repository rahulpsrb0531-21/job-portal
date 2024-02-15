import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import HomePage from './pages/candidate/homePage'
import ProfilePage from './pages/candidate/profilePage'
import JobPage from './pages/candidate/jobPage'
import AppliedPage from './pages/candidate/appliedPage'
import { MainPage } from './pages/mainPage'
import Register from './sections/auth/register'
import Login from './sections/auth/login'
import CompanyDetails from './pages/candidate/companyDetails'
import RecruiterLayout from './layouts/recruiter/recruiterLayout'
import RecruiterRegister from './sections/recruiter/register'
import EditRecruiterProfile from './pages/recruiter/EditRecruiterProfile'
import { useSelector } from 'react-redux'
import CreateJob from './pages/recruiter/createJob'
import RecruiterLogin from './sections/recruiter/login'
import RecruiterJobs from './pages/recruiter/recruiterJobs'
import JobDetails from './pages/candidate/jobDetails'
import ApplicantPage from './pages/recruiter/applicantPage'
import CreateApplication from './pages/candidate/createApplication'
import CandidateList from './pages/adminDashboard/candidate/candidateList'
import AdminLayout from './layouts/adminDashboard/adminLayout'
import RecruiterList from './pages/adminDashboard/recruiter/recruiterList'
import JobList from './pages/adminDashboard/job/jobList'
import CreateCandidate from './pages/adminDashboard/candidate/createCandidate'
import CreateJobByAdmin from './pages/adminDashboard/job/createJobByAdmin'
import AdminLogin from './sections/adminLogin'
import DashboardPage from './pages/recruiter/dashboardPage'
import EditJob from './pages/recruiter/editJobPage'
import CreateRecruiter from './pages/adminDashboard/recruiter/createRecruiter'
import UpdateJobByAdmin from './pages/adminDashboard/job/updateJobByAdmin'
import UpdateRecruiterByAdmin from './pages/adminDashboard/recruiter/updateRecruiterByAdmin'
import AppliedJobDetails from './pages/candidate/appliedJobDetails'
import NotificationList from './pages/adminDashboard/notification/notificationList'

export default function Router() {
    const { user } = useSelector((state) => state.auth)
    return useRoutes([
        user === 'RECRUITER' ? " " :
            {
                path: '/recruiter',
                element: <RecruiterLayout />,
                children: [
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "jobs", element: <RecruiterJobs /> },
                    { path: "create/job", element: <CreateJob /> },
                    { path: "edit/job", element: <EditJob /> },
                    { path: "applicant", element: <ApplicantPage /> },
                    { path: "profile", element: <EditRecruiterProfile /> },
                ]
            },

        user === 'RECRUITER' ? " " : {
            path: '/candidate',
            element: <MainLayout />,
            children: [
                { path: "dashboard", element: <HomePage /> },
                { path: "profile", element: <ProfilePage /> },
                { path: "lists", element: <JobPage /> },
                { path: ":jobName", element: <JobDetails /> },
                { path: "applications", element: <AppliedPage /> },
                { path: "applied/:JobName", element: <AppliedJobDetails /> },
                { path: "create/application", element: <CreateApplication /> },
            ]
        },
        user === "ADMIN" ? "" :
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    { path: 'candidates', element: <CandidateList /> },
                    { path: 'create/candidate', element: <CreateCandidate /> },
                    { path: 'recruiters', element: <RecruiterList /> },
                    { path: 'create/recruiter', element: <CreateRecruiter /> },
                    { path: 'edit/recruiter', element: <UpdateRecruiterByAdmin /> },
                    { path: 'jobs', element: <JobList /> },
                    { path: 'job/create', element: <CreateJobByAdmin /> },
                    { path: 'edit/job', element: <UpdateJobByAdmin /> },
                    { path: 'notification', element: <NotificationList /> }
                ]
            },
        {
            path: '/company',
            element: <MainLayout />,
            children: [
                { path: ":name", element: <CompanyDetails /> }
            ]
        },

        // Candidate login and register staff 
        { path: '/', element: <MainPage /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },

        // Recruiter login and register staff
        { path: '/onboarding/recruiter/login', element: <RecruiterLogin /> },
        { path: '/onboarding/recruiter/sign-up', element: <RecruiterRegister /> },
        { path: '/onboarding/recruiter', element: <EditRecruiterProfile /> },

        // Admin login staff
        { path: '/admin/login', element: <AdminLogin /> },

    ])
}