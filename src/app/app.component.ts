import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CompanyListComponent } from "./company/company-list/company-list.component";
import { RouterModule } from '@angular/router';
import { CompanyService } from './company/company.service';
import { map } from 'rxjs';

@Component({
  selector: 'fbc-root',
  standalone: true,
  imports: [AsyncPipe, CompanyListComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'firebootcamp-crm';

  companyService = inject(CompanyService);
  companyCount$ = this.companyService.getCompanies().pipe(
    map(companies => companies.length)
  );
}
