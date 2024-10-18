import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap } from 'rxjs';
import { CompanyService } from '../company/company.service';
import { CompanyActions } from './company.actions';

@Injectable()
export class CompanyEffects {
  private actions$ = inject(Actions);
  private companyService = inject(CompanyService);

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.loadCompanies),
      switchMap(() => this.companyService.getCompanies()),
      map(companies => CompanyActions.loadCompaniesSuccess({ companies })),
    ),
  );

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActions.deleteCompany),
      switchMap((action) => this.companyService.deleteCompany(action.id)),
      concatMap((company) => [
        CompanyActions.deleteCompanySuccess({ id: company.id }),
        CompanyActions.loadCompanies(),
      ]),
    ),
  );
}
