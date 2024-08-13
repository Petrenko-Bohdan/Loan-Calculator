import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {

	constructor() { }

	calculateMonthlyPayment(loanAmount: number, annualInterestRate:number, loanPeriod:number, monthlyPaymentAmount:number): any[]{
		const payments:any=[];
		const monthlyInterestsRate=annualInterestRate/12/100;
		const numberOfPayments=loanPeriod;
		const monthlyPayment=monthlyPaymentAmount;


let loanCapital=loanAmount;
let totalInstallment=0;
let profit=0;
let currentDate = new Date();

for(let i=0; i<numberOfPayments; i++){
	const capital = loanCapital;
	const interests = loanCapital*monthlyInterestsRate;
	const principalInstalment = monthlyPayment-interests;
	
	totalInstallment = interests+principalInstalment;
	profit += interests;
	loanCapital -= principalInstalment;

	const formatDate=format(currentDate, 'MM/yyyy')

	payments.push({
		month: formatDate,
		capital: capital.toFixed(2),
		interests: interests.toFixed(2),
		principalInstalment: principalInstalment.toFixed(2),
		totalInstallment: totalInstallment.toFixed(2),		
		profit: profit.toFixed(2),
    overpayment: '',
	});
	currentDate.setMonth(currentDate.getMonth()+1);
	if (loanCapital<=0){
		break;
	}
}
		return payments;
	}

	calculateLoanPeriod(loanAmount: number, annualInterestRate:number, monthlyPaymentAmount:number):number{
		const monthlyInterestRate = annualInterestRate/12/100;
		return Math.ceil(
			Math.log(monthlyPaymentAmount/(monthlyPaymentAmount-loanAmount*monthlyInterestRate))/Math.log(1 + monthlyInterestRate)
		)
	}

	calculateMonthlyPaymentAmount(loanAmount: number, annualInterestRate:number, loanPeriod:number):number{
		const monthlyInterestRate = annualInterestRate/12/100;
		const numberOfPayments = loanPeriod;
		return loanAmount*monthlyInterestRate/(1-Math.pow(1+monthlyInterestRate,-numberOfPayments));
	}

  recalculatePaymentsWithOverpayment(payments: any[]): any[] {
    return payments.map((payment) => {
      payment.totalInstallment = (
        parseFloat(payment.principalInstalment) +
        parseFloat(payment.interests) +
        parseFloat(payment.overpayment || '0')).toFixed(2);
      return payment;
    });
  }
}


