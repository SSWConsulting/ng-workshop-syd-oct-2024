import { createReducer, on } from '@ngrx/store';
import { CompanyActions } from './company.actions';
import { Company } from '../company/company';

export const companyFeatureKey = 'company';

export interface State {
  companies: Company[];
}

export const initialState: State = {
  companies: [],
};

export const reducer = createReducer(
  initialState,
  on(CompanyActions.loadCompaniesSuccess, (oldState, action) => ({
    ...oldState,
    companies: action.companies,
  })),
  on(CompanyActions.deleteCompanySuccess, (oldState, action) => ({
    ...oldState,
    companies: oldState.companies.filter((c) => c.id !== action.id),
  })),
);
