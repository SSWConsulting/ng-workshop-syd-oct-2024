import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';

export type CompanyFormGroup = {
  [key in keyof Company]: FormControl<Company[key] | null>;
} & {
  checkPhone: FormControl<boolean | null>;
};

@Component({
  selector: 'fbc-company-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent implements OnInit {
  private companyService = inject(CompanyService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  isNewCompany = false;

  companyFormGroup = new FormGroup<CompanyFormGroup>({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    checkPhone: new FormControl(false),
    phone: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit(): void {
    this.setupFormListeners();

    const companyId = +this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !companyId;

    if (!this.isNewCompany) {
      this.getCompany(companyId);
    }
  }

  setupFormListeners() {
    this.companyFormGroup.controls.checkPhone.valueChanges.subscribe(
      (checked) => {
        const phoneControl = this.companyFormGroup.controls.phone;

        if (checked) {
          phoneControl.setValidators([Validators.required]);
          phoneControl.enable();
        } else {
          phoneControl.clearValidators();
          phoneControl.disable();
        }
        phoneControl.updateValueAndValidity();
      },
    );
  }

  getCompany(companyId: number) {
    this.companyService.getCompany(companyId).subscribe((company) => {
      this.companyFormGroup.patchValue({ ...company, checkPhone: !!company.phone });
    });
  }

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

    if (this.isNewCompany) {
      this.companyService.addCompany(company).subscribe((company) => {
        this.router.navigate(['/company/list']);
      });
    } else {
      this.companyService.updateCompany(company).subscribe((company) => {
        this.router.navigate(['/company/list']);
      });
    }
  }
}
