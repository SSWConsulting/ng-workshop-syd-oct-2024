import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { finalize, Observable, tap } from 'rxjs';
import { CompanyTableComponent } from '../company-table/company-table.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, CompanyTableComponent, RouterLink],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent {
  private companyService = inject(CompanyService);

  companies$ = this.companyService.getCompanies().pipe(
    tap((companies) => console.log('TAP - Component', companies)),
    finalize(() => console.log('Finalize: Complete')),
  );

  deleteCompany(companyId: number): void {
    console.log('Delete company Component', companyId);
    this.companyService.deleteCompany(companyId).subscribe();
  }
}
