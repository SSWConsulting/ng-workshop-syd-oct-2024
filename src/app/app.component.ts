import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CompanyListComponent } from "./company/company-list/company-list.component";
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCompanyCount } from './+state/company.selectors';
import { CompanyActions } from './+state/company.actions';

@Component({
  selector: 'fbc-root',
  standalone: true,
  imports: [AsyncPipe, CompanyListComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'firebootcamp-crm';
  store$ = inject(Store);

  companyCount$ = this.store$.select(selectCompanyCount);

  ngOnInit(): void {
    this.store$.dispatch(CompanyActions.loadCompanies());
  }
}
