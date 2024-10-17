import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'Company 1', phone: '123-456-7890', email: 'foo@123' },
      { name: 'Company 2', phone: '123-456-7890', email: 'foo@123' },
      { name: 'Company 3', phone: '123-456-7890', email: 'foo@123' },
    ];
  }
}
