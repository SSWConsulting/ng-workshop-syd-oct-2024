import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, shareReplay, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_BASE = 'https://app-fbc-crm-api-prod.azurewebsites.net/api';

  companies$ = new BehaviorSubject<Company[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    console.log('load companies')
    this.httpClient
      .get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        tap((companies) => console.log('TAP - Service', companies)),
        catchError(this.errorHandler<Company[]>),
      )
      .subscribe((companies) => {
        console.log('companies updated')
        this.companies$.next(companies);
      });
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient
      .get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(this.errorHandler<Company>));
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient
      .post<Company>(`${this.API_BASE}/company`, company)
      .pipe(
        tap(() => this.loadCompanies()),
        catchError(this.errorHandler<Company>),
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient
      .put<Company>(`${this.API_BASE}/company/${company.id}`, company)
      .pipe(
        tap(() => this.loadCompanies()),
        catchError(this.errorHandler<Company>),
      );
  }

  deleteCompany(companyId: number): Observable<Company> {
    console.log('Delete company Service', companyId);
    return this.httpClient
      .delete<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        tap(() => this.loadCompanies()),
        catchError(this.errorHandler<Company>),
      );
  }

  errorHandler<T>(error: any): Observable<T> {
    console.error('CompanyService error', error);
    return new Observable<T>();
  }
}
