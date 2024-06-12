import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'HOD',
    path: '/hod',
    icon: icon('ic_user'),
  },
  {
    title: 'Placement Officer',
    path: '/placement-officer',
    icon: icon('ic_cart'),
  },
  {
    title: 'Student Details',
    path: '/student',
    icon: icon('ic_blog'),
  },

];

export default navConfig;
