// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/candidate/dashboard',
    icon: 'ri:home-line'
  },
  {
    title: 'Profile',
    path: '/candidate/profile',
    icon: 'system-uicons:user-male'
  },
  {
    title: 'Jobs',
    path: '/candidate/lists',
    icon: 'streamline:bag-suitcase-2'
  },
  {
    title: 'Applied Jobs',
    path: '/candidate/applications',
    icon: 'octicon:checklist-24'
  }
]

export default navConfig
