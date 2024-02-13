// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
    {
        title: 'Dashboard',
        path: '/recruiter/dashboard',
        icon: 'ri:home-line'
    },
    {
        title: 'Jobs',
        path: '/recruiter/jobs',
        icon: 'system-uicons:user-male'
    },
    {
        title: 'Applicant',
        path: '/recruiter/applicant',
        icon: 'streamline:bag-suitcase-2'
    }
]

export default navConfig
