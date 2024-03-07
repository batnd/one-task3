import { Routes } from '@angular/router';
import {LayoutComponent} from "@shared/components/layout/layout.component";
import {authForwardGuard} from "@core/guards/auth-forward.guard";
import {authGuard} from "@core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'ngrx',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('@pages/signup/signup.component').then(c => c.SignupComponent),
        canActivate: [authForwardGuard]
      },
      {
        path: 'login',
        loadComponent: () => import('@pages/login/login.component').then(c => c.LoginComponent),
        canActivate: [authForwardGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('@pages/profile/profile.component').then(c => c.ProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'users',
        loadComponent: () => import('@pages/users/users.component').then(c => c.UsersComponent),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'ngrx'
  }
];
