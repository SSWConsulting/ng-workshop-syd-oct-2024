import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  private companyService = inject(CompanyService);
  private router = inject(Router);
  company: Company = { id: 0, name: '', email: '', phone: '' };

  saveCompany() {
    this.companyService.addCompany(this.company).subscribe((company) => {
      this.router.navigate(['/company/list']);
    });
  }
}
