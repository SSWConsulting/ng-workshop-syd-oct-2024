import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CompanyTableComponent } from '../company-table/company-table.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCompanies } from '../../+state/company.selectors';
import { CompanyActions } from '../../+state/company.actions';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, CompanyTableComponent, RouterLink],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent {
  private store = inject(Store);

  companies$ = this.store.select(selectCompanies);

  deleteCompany(companyId: number): void {
    console.log('Delete company Component', companyId);
    this.store.dispatch(CompanyActions.deleteCompany({ id: companyId }));
  }
}
