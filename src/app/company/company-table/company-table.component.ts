import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../company';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fbc-company-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.scss'
})
export class CompanyTableComponent {
  @Input()
  companies: Company[] = [];

  @Output()
  deleteCompanyClicked: EventEmitter<number> = new EventEmitter<number>();

  deleteCompany(companyId: number): void {
    this.deleteCompanyClicked.emit(companyId);
  }
}
