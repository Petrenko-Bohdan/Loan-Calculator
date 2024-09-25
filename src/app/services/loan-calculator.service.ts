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

private get monthlyInterestRate():number{
		return this.annualInterestRate! / 100 / 12;
	}


	calculateLoan(loanAmount:number, annualInterestRate:number, loanPeriod:number, monthlyPaymentAmount:number):void{

		this.loanAmount = loanAmount;
		this.annualInterestRate = annualInterestRate;
				
		this.loanPeriod = loanPeriod ?? this.calculateLoanPeriod();
		this.monthlyPaymentAmount = monthlyPaymentAmount ?? this.calculateMonthlyPaymentAmount();
		// this.monthlyPaymentAmount =  (loanAmount * this.monthlyInterestRate) / (1 - Math.pow(1 + this.monthlyInterestRate, -this.loanPeriod));
		console.log(this.monthlyPaymentAmount);
	

		
		const payments = [];
		let balance = this.recalculateBalance(loanAmount);
		let currentDate = new Date();
		
		for(let i=0; i<this.loanPeriod; i++){
			const interest = balance * this.monthlyInterestRate;			
			const payment = (loanAmount * this.monthlyInterestRate) / (1 - Math.pow(1 + this.monthlyInterestRate, -this.loanPeriod));
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

	private calculateLoanPeriod():number{		
		return Math.log(this.monthlyPaymentAmount! / (this.monthlyPaymentAmount! - this.loanAmount! * this.monthlyInterestRate)) / Math.log(1 + this.monthlyInterestRate);
	console.log("a");
	}

	private calculateMonthlyPaymentAmount():number{
		return this.loanAmount! * this.monthlyInterestRate / (1 - Math.pow(1 + this.monthlyInterestRate, -this.loanPeriod!));
		console.log("b");
	}

	public recalculateLoan(index:number):void{
		const payments = this.paymentSubject.getValue();
		let balance = payments[index].capital- payments[index].principalPayment- payments[index].overpayment;

		

		for(let i=index+1; i<payments.length; i++){
			const interest = balance * this.monthlyInterestRate; 
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
