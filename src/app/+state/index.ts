import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromCompany from './company.reducer';
import { CompanyEffects } from './company.effects';


export interface State {
  [fromCompany.companyFeatureKey]: fromCompany.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromCompany.companyFeatureKey]: fromCompany.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const effects = [
  CompanyEffects,
]
