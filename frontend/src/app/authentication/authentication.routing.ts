import {Routes} from '@angular/router';
import {LoginComponent} from './_components/login/login.component';
import {SignupComponent} from './_components/signup/signup.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
    ]
  }
];
