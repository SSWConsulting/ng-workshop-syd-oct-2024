import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  private companyService = inject(CompanyService);
  private router = inject(Router);

  companyFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    phone: new FormControl(''),
  })

  saveCompany() {
    const company = this.companyFormGroup.value as any as Company;
    this.companyService.addCompany(company).subscribe((company) => {
      this.router.navigate(['/company/list']);
    });
  }
}
