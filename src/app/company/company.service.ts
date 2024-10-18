import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap(companies => console.log('TAP - Service', companies)),
        catchError(this.errorHandler<Company[]>)
      );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company)
    .pipe(
      catchError(this.errorHandler<Company>)
    );
  }

  deleteCompany(companyId: number): Observable<Company> {
    console.log("Delete company Service", companyId);
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        catchError(this.errorHandler<Company>)
      );
  }

  errorHandler<T>(error: any): Observable<T> {
    console.error('CompanyService error', error);
    return new Observable<T>();
  }
}
