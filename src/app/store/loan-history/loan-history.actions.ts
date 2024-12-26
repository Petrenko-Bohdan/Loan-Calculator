import { createAction, props } from '@ngrx/store';
import {CalculationResult} from '../../models/loan-history.model'

export const addCalculation = createAction(
  '[Loan History] Add calculation',
  props<{ calculation: CalculationResult }>()
);

export const clearHistory = createAction('[Loan History] Clear history');
