import { Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'company',
    children: [
      {
        path: 'list',
        component: CompanyListComponent
      },
      {
        path: 'add',
        component: CompanyEditComponent
      },
      {
        path: 'edit/:id',
        component: CompanyEditComponent
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
    component: NotFoundComponent
  }
];
