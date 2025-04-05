import Login from '@/App/pages/auth/Login';
import { RoutesMapInterface } from '@/router/interface/routesMap.interface';

const privateRoutesMap: RoutesMapInterface[] = [
  {
    link: '/auth/login',
    title: 'nav.HOME',
    Element: Login,
  },
];
export default privateRoutesMap;
