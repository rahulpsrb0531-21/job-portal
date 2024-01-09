// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    // path: '/my/home',
    path: '/home',
    icon: 'ri:home-line'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: 'system-uicons:user-male'
  },
  {
    title: 'Jobs',
    path: '/jobs',
    icon: 'streamline:bag-suitcase-2'
  },
  {
    title: 'Applied',
    path: '/applications',
    icon: 'octicon:checklist-24'
  },
  {
    title: 'Messages',
    path: '/my/messages',
    icon: 'mynaui:message'
  },
  {
    title: 'Discover',
    path: '/my/discover',
    icon: 'mdi:compass-outline'
  },
]

export default navConfig
