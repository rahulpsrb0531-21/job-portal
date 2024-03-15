// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/candidate/dashboard',
    // icon: 'ri:home-line'
    icon: "system-uicons:home"
  },
  {
    title: 'Profile',
    path: '/candidate/profile/overview',
    // path: '/candidate/profile',
    // icon: "mdi:user-outline"
    // icon: 'system-uicons:user-male'
    icon: "clarity:user-line"
    // icon: "simple-line-icons:user"
  },
  {
    title: 'Jobs',
    path: '/candidate/lists',
    // icon: "ri:shopping-bag-line"
    icon: "iconoir:suitcase"
  },
  {
    title: 'Applied Jobs',
    path: '/candidate/applications',
    icon: 'octicon:checklist-24'
  }
]

export default navConfig
