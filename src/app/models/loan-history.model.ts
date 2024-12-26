export interface CalculationResult {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  payments: any[];
  calculationDate: string;
}
