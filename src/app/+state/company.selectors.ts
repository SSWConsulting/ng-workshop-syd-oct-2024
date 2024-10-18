import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCompany from './company.reducer'

export const selectCompanyState = createFeatureSelector<fromCompany.State>(
  fromCompany.companyFeatureKey
);

export const selectCompanies = createSelector(
  selectCompanyState,
  (state) => state.companies,
);

export const selectCompanyCount = createSelector(
  selectCompanies,
  (companies) => companies.length,
)
