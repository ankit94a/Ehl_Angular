import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from 'projects/shared/src/guards/auth-guard';

export const routes: Routes = [

  {
      path:'',
      component:LayoutComponent,
      children:[
            {
              path: '',
              redirectTo: 'dashboard',
              pathMatch:'full'

            },
            {
              path: 'dashboard',
              loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
              canActivate: [AuthGuard],
            },
            {
              path: 'landing-page-update',
              loadComponent: () => import('./landing/landing-page-update/landing-page-update.component').then(m => m.LandingPageUpdateComponent),
              canActivate: [AuthGuard],
            },
            {
              path: 'emer',
              loadComponent: () => import('./emer/emer-list/emer-list.component').then(m => m.EmerListComponent),
              canActivate: [AuthGuard],
            },
            {
              path: 'attribute',
              loadComponent: () => import('./attribute/attribute.component').then(m => m.AttributeComponent),
              canActivate: [AuthGuard],
            },
            {
              path: 'policy',
              loadComponent: () => import('./policy/policy-list/policy-list.component').then(m => m.PolicyListComponent),
              canActivate: [AuthGuard],
            },
      ]
  }
]
