import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies = [
      { name: 'Company 1', phone: '123-456-7890', email: 'foo@123' },
      { name: 'Company 2', phone: '123-456-7890', email: 'foo@123' },
      { name: 'Company 3', phone: '123-456-7890', email: 'foo@123' },
    ];
  }
}
