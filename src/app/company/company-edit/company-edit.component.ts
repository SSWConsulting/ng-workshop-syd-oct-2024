import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';

export type CompanyFormGroup = {
  [key in keyof Company]: FormControl<Company[key] | null>;
}

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent {
  private companyService = inject(CompanyService);
  private router = inject(Router);

  companyFormGroup = new FormGroup<CompanyFormGroup>({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
  })

  saveCompany() {
    this.companyFormGroup.markAllAsTouched();

    if (this.companyFormGroup.invalid) {
      return;
    }

    // const company = {
    //   id: this.companyFormGroup.value.id,
    //   name: this.companyFormGroup.value.name,
    //   email: this.companyFormGroup.value.email,
    //   phone: this.companyFormGroup.value.phone,
    // } as Company;

    const company = {
      ...this.companyFormGroup.value,
    } as Company;

    this.companyService.addCompany(company).subscribe((company) => {
      this.router.navigate(['/company/list']);
    });
  }
}
