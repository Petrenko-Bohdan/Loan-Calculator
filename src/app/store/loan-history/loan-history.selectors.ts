import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoanHistoryState } from "./loan-history.reducer";

export const selectorLoanHistoryState = createFeatureSelector<LoanHistoryState>('loanHistory');

export const selectAllCalculations = createSelector(
	selectorLoanHistoryState,
	(state) => state.calculations
);

