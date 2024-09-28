import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'activity',
    loadComponent: () => import('@/pages/home/home.component'),
  },
  {
    path: 'activity/:id',
    loadComponent: () =>
      import('@components/activity-card/activity-card.component'),
  },
  {
    path: 'activity/:id',
    loadComponent: () =>
      import('@components/activity-card/activity-card.component'),
  },

  { path: '', redirectTo: 'activity', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('@/pages/page-not-found/page-not-found.component'),
  },
];
