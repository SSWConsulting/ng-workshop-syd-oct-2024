import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Company } from '../company/company';

export const CompanyActions = createActionGroup({
  source: 'Company',
  events: {
    'Load Companies': emptyProps(),
    'Load Companies Success': props<{ companies: Company[] }>(),
    'Delete Company': props<{ id: number }>(),
    'Delete Company Success': props<{ id: number }>(),
  }
});
