import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fbc-company-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies = [
      { id: 1, name: 'Company 1', phone: '123-456-7890' },
      { id: 2, name: 'Company 2', phone: '123-456-7890' },
      { id: 3, name: 'Company 3', phone: '123-456-7890' },
    ];
  }
}
