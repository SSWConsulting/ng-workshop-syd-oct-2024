import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'company',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./company/company-list/company-list.component').then(m => m.CompanyListComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./company/company-edit/company-edit.component').then(m => m.CompanyEditComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./company/company-edit/company-edit.component').then(m => m.CompanyEditComponent)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'company/list',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
