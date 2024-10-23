import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {
	private paymentSubject = new BehaviorSubject<any[]>([]);
	payments$ = this.paymentSubject.asObservable();
	private loanAmount!: number;
	
	

	calculateLoan(loanAmount: number, interestRate: number, loanTerm: number): void {
		console.log(loanAmount);
	}

}