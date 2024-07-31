import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {

	constructor() { }

	calculateMonthlyPayment(principal: number, annualRate: number, term: number, extraPayment: number = 0, overpayments:{month:number, amount:number}[]=[] ):any[]{

	const monthlyRate  = annualRate / 100 / 12;
	const numberOfPayments = term * 12;
	const monthlyPayment = principal * monthlyRate  / (1-Math.pow(1+monthlyRate, -numberOfPayments));
	const payments: any[]=[];

	let balance = principal;
	let totalInterest = 0;

	for(let i=0; i<numberOfPayments; i++){
		const interests = balance * monthlyRate;
		let principalPayment = monthlyPayment - interests;
		
		const overpayment = overpayments.find(p=>p.month === i);
		if(overpayment){
			principalPayment += overpayment.amount;
		}

		balance -= principalPayment;
		totalInterest += interests;
		payments.push({
			month: i+1,
			interests: interests,
			principal: principalPayment,
			balance: balance>0?balance:0,
			totalInterest: totalInterest,
		});
		if(balance<=0) break;
	}
	return payments;

}

}