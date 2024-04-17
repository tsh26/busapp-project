import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {AuthGuard} from './_guards/auth.guard';
import {BusSearchComponent} from './bus-search/bus-search.component';
import {BusRideTuneComponent} from './bus-ride-tune/bus-ride-tune.component';

export const Approutes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
      {
        path: 'authentication',
        loadChildren:
          () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'search-bus',
        component: BusSearchComponent,
      },

      {
        path: 'bus-ride-tunes',
        component: BusRideTuneComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
