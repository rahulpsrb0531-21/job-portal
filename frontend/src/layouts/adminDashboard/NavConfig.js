// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'Home',
  //   path: '/jobs/home',
  //   icon: 'ri:home-line'
  // },
  {
    title: 'Candidate',
    path: '/admin/candidates',
    icon: 'system-uicons:user-male'
  },
  {
    title: 'Recruiter',
    path: '/admin/recruiters',
    icon: 'streamline:bag-suitcase-2'
  },
  {
    title: 'Job',
    path: '/admin/jobs',
    icon: 'octicon:checklist-24'
  },
  {
    title: 'Notification',
    path: '/admin/notification',
    icon: 'fluent:alert-20-regular'
  },
]

export default navConfig
