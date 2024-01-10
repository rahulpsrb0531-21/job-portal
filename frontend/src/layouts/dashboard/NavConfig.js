// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    // path: '/my/home',
    path: '/jobs/home',
    icon: 'ri:home-line'
  },
  {
    title: 'Profile',
    path: '/jobs/profile',
    icon: 'system-uicons:user-male'
  },
  {
    title: 'Jobs',
    path: '/jobs/lists',
    icon: 'streamline:bag-suitcase-2'
  },
  {
    title: 'Applied',
    path: '/jobs/applications',
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
