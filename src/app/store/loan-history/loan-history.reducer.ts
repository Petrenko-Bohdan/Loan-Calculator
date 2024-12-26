import {createReducer, on} from '@ngrx/store';
import {addCalculation, clearHistory} from './loan-history.actions';
import {CalculationResult} from '../../models/loan-history.model'

export interface LoanHistoryState {
	calculations: CalculationResult[];
}

export const initialState: LoanHistoryState = {
	calculations: []
};

export const loanHistoryReducer = createReducer(
  initialState,
  on(addCalculation, (state, { calculation }) => ({
    ...state,
    calculations: [...state.calculations, calculation],
  })),
  on(clearHistory, () => initialState)
);