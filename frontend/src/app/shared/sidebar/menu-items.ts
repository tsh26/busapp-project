import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Bus Information',
    icon: 'icon-Bird',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/search-bus',
    title: 'Search Bus',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  },
];

export const ROUTES_AUTH: RouteInfo[] = [
  {
    path: '',
    title: 'Bus Information',
    icon: 'icon-Bird',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/search-bus',
    title: 'Search Bus',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/bus-ride-tunes',
    title: 'Bus Ride Tunes',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  }
];
