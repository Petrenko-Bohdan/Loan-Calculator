import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { format } from 'date-fns';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {
	private paymentSubject = new BehaviorSubject<any[]>([]);
  payment$ = this.paymentSubject.asObservable();
	private loanAmount:number|undefined;
	private annualInterestRate:number|undefined;
	private loanPeriod:number|undefined;
	private monthlyPaymentAmount:number|undefined;

			

	calculateLoan(loanAmount:number, annualInterestRate:number, loanPeriod:number, monthlyPaymentAmount:number):void{

		this.loanAmount = loanAmount;
		this.annualInterestRate = annualInterestRate;
		const monthlyInterestRate = this.annualInterestRate! / 100 / 12;
		
		this.loanPeriod = loanPeriod;
		this.monthlyPaymentAmount =  (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -this.loanPeriod));
		
		const payments = [];
		let balance = this.recalculateBalance(loanAmount);
		let currentDate = new Date();
		
		for(let i=0; i<this.loanPeriod; i++){
			const interest = balance * monthlyInterestRate;			
			const payment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -this.loanPeriod));
			const principalInstalment = payment - interest;
			const formatDate=format(currentDate, 'MM/yyyy')

			payments.push({
				month: formatDate,
				capital: balance.toFixed(2), 
				interest: interest.toFixed(2),
				principalInstalment: principalInstalment.toFixed(2),
				totalInstallment: payment.toFixed(2),			
				overpayment: '',
			});
			currentDate.setMonth(currentDate.getMonth()+1);
			balance -= principalInstalment;
		}
		this.paymentSubject.next(payments);
	}


	public recalculateLoan(index:number):void{
		const payments = this.paymentSubject.getValue();
		let balance = payments[index].capital- payments[index].principalPayment- payments[index].overpayment;

		const monthlyInterestRate = this.annualInterestRate! / 100 / 12;

		for(let i=index+1; i<payments.length; i++){
			const interest = balance * monthlyInterestRate; 
			let principal= payments[i].monthlyPayment - interest;
			const extraPayment = payments[i].overpayment;
			const payment = principal + interest;

			payments[i]={
				month: i+1,
				capital: balance,
				principalInstalment: principal,
				interests: interest,
				totalInstallment: payment,
				overpayment: payments[i].overpayment,
			}
			balance -= principal;
		}
		this.paymentSubject.next(payments);
	}

	private recalculateBalance(amount:number):number{
		const payments = this.paymentSubject.getValue();
		let balance = amount;

		for (let i=0; i<payments.length; i++){
			balance -= payments[i].extraPayment;
		}
		return balance;
	}	
}
